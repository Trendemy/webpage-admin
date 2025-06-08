import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
   getAuth,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut as signOutUser
} from 'firebase/auth';
import { AuthContext } from '~/context';
import { userService } from '~/services';
import NProgress from '~/config/nprogress';
import SignIn from '~/app/pages/SignIn';
import { logger } from '~/utils';

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const auth = getAuth();

   useEffect(() => {
      /**
       * Listens for authentication state changes.
       * Fetches user data from Firestore when a user logs in.
       */
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
         if (!currentUser) {
            setUser(null);
            setLoading(false);
            return;
         }

         try {
            const doc = await userService.getById(currentUser.uid);
            setUser(
               doc
                  ? {
                       uid: currentUser.uid,
                       email: currentUser.email,
                       isSuper: doc?.isSuper || false
                    }
                  : null
            );
         } catch (error) {
            logger('Error fetching user data:', error);
         } finally {
            setLoading(false);
         }
      });

      return () => unsubscribe();
   }, [auth]);

   /**
    * Handles user sign-in using email and password.
    * @param {string} account - User's email.
    * @param {string} password - User's password.
    * @returns {Promise<boolean>} `true` if login is successful, `false` otherwise.
    */
   const signIn = async (account, password) => {
      try {
         NProgress.start();
         const userCredential = await signInWithEmailAndPassword(
            auth,
            account,
            password
         );
         const doc = await userService.getById(userCredential.user.uid);
         if (!doc) {
            await signOutUser(auth);
            return false;
         }
         setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            isSuper: doc?.isSuper || false
         });
         return true;
      } catch (error) {
         logger('error login', error);
         return false;
      } finally {
         NProgress.done();
      }
   };

   /**
    * Logs out the current user.
    * @returns {Promise<void>}
    */
   const signOut = async () => {
      try {
         NProgress.start();
         await signOutUser(auth);
         setUser(null);
      } catch (error) {
         logger('error logout', error);
      } finally {
         NProgress.done();
      }
   };

   if (loading) return <></>;

   return (
      <AuthContext.Provider value={{ user, signIn, signOut }}>
         {user ? children : <SignIn />}
      </AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.node.isRequired
};

export default AuthProvider;

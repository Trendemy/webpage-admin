import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { Logo } from '~/components/Icons';

const Header = ({ onHeightChange }) => {
   const headerRef = useRef(null);
   const { user, signOut } = useAuth();

   useEffect(() => {
      const updateHeaderHeight = () => {
         const heightHeader = headerRef.current?.getBoundingClientRect().height;
         if (heightHeader) {
            onHeightChange(heightHeader);
         }
      };
      updateHeaderHeight();
      window.addEventListener('resize', updateHeaderHeight);
      return () => {
         window.removeEventListener('resize', updateHeaderHeight);
      };
   }, [onHeightChange]);

   return (
      <header
         className='fixed w-full top-0 bg-zinc-800 shadow z-10'
         ref={headerRef}
      >
         <div className='container flex justify-between items-center p-2'>
            <div className='w-48 outline-none'>
               <Link to='/' className='outline-none'>
                  <Logo />
               </Link>
            </div>
            <UserOnline user={user} onSignOut={signOut} />
         </div>
      </header>
   );
};

const UserOnline = ({ user, onSignOut }) => {
   return (
      <nav>
         <ul className='flex text-sm font-bold'>
            <li className='text-gray-300 hover:text-white border-r pr-2 mr-2 select-none outline-none'>
               Xin chào, {user?.email}
            </li>
            <li
               className='text-red-500 hover:text-red-600 cursor-pointer select-none outline-none'
               onClick={onSignOut}
            >
               Đăng xuất
            </li>
         </ul>
      </nav>
   );
};

Header.propTypes = {
   onHeightChange: PropTypes.func
};
UserOnline.propTypes = {
   user: PropTypes.object,
   onSignOut: PropTypes.func
};

export default Header;

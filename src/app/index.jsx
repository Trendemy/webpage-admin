import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '~/providers';
import router from '~/routes';

function App() {
   return (
      <AuthProvider>
         <RouterProvider router={router} />
         <Toaster reverseOrder={true} />
      </AuthProvider>
   );
}

export default App;

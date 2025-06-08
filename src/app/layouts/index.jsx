import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '~/app/layouts/Header';
import Footer from '~/app/layouts/Footer';
import BackTopTop from '~/components/BackTopTop';

const RootLayout = () => {
   const [top, setTop] = useState(0);

   return (
      <>
         <Header onHeightChange={setTop} />
         <main style={{ marginTop: top }}>
            <Outlet />
         </main>
         <Footer />
         <BackTopTop />
      </>
   );
};

export default RootLayout;

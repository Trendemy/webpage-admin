import { Outlet } from 'react-router';
import Header from '~/app/layouts/Header';
import Footer from '~/app/layouts/Footer';
import BackTopTop from '~/components/BackTopTop';

const RootLayout = () => {
    return (
        <>
            <Header />
            <main className='mt-14'>
                <Outlet />
            </main>
            <Footer />
            <BackTopTop />
        </>
    );
};

export default RootLayout;

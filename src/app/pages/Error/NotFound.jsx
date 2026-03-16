import { useNavigate } from 'react-router';
import { ArrowLeft } from '~/components/Icons';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-10'>
                <div className='flex gap-3'>
                    <h3 className='text-3xl font-black'>404</h3>
                    <div className='border-2 border-black'></div>
                    <div className='my-auto'>
                        <h3 className='text-3xl font-black'>NOT FOUND</h3>
                    </div>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className='inline-flex text-sm text-blue-600 uppercase font-medium hover:underline underline-offset-4 gap-2'
                >
                    <ArrowLeft className='size-5' strokeWidth={2} /> Go back
                </button>
            </div>
        </div>
    );
};

export default NotFound;

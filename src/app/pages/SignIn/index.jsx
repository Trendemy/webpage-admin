import { useState } from 'react';
import { useAuth } from '~/hooks';
import { Logo } from '~/components/Icons';
import { Input } from '~/components/UI';

const SignIn = () => {
    const { signIn } = useAuth();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((props) => ({ ...props, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;

        if (email.trim() && password.trim()) {
            const success = await signIn(email, password);
            if (!success) alert('Sai tài khoản mật khẩu');
        } else {
            alert('Nhập đầy đủ thông tin');
        }
    };

    return (
        <div className='flex flex-col px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='w-1/2 mx-auto'>
                    <Logo />
                </div>
            </div>
            <div className='mt-12 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    method='POST'
                    className='space-y-6'
                    onSubmit={handleSubmit}
                >
                    <div className='mb-3'>
                        <Input
                            id='email'
                            label='Email'
                            name='email'
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <Input
                            id='password'
                            label='Mật khẩu'
                            type='password'
                            name='password'
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type='submit'
                        className='flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl outline-none'
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;

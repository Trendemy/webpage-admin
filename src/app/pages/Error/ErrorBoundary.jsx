import { useRouteError } from 'react-router';
import { NODE_ENV } from '~/config/env';

const ErrorBoundary = () => {
    const error = useRouteError();
    const isDevelopment = NODE_ENV === 'development';

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl uppercase font-bold text-gray-800 mb-4'>
                        Lỗi
                    </h1>
                    <p className='text-gray-600 leading-relaxed'>
                        Có lỗi xảy ra. Vui lòng thử lại sau.
                    </p>
                </div>
                {/* Development Error Details */}
                {isDevelopment && error && (
                    <div className='mt-8 bg-red-50 border border-red-200 rounded-xl p-4'>
                        <details className='text-sm'>
                            <summary className='font-medium text-red-800 cursor-pointer hover:text-red-900'>
                                Chi tiết lỗi
                            </summary>
                            <pre className='mt-3 text-red-700 overflow-auto text-xs bg-red-100 p-3 rounded'>
                                {error.stack || JSON.stringify(error, null, 2)}
                            </pre>
                        </details>
                    </div>
                )}

                {/* Support Info */}
                <div className='mt-8 text-center text-sm text-gray-500'>
                    <p>Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ</p>
                    <a
                        href='mailto:support@yoursite.com'
                        className='text-blue-600 hover:text-blue-700 font-medium'
                    >
                        trendemy@support.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary;

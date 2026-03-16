import { createBrowserRouter } from 'react-router';
import RootLayout from '~/app/layouts';
import CoursePage from '~/app/pages/Course';
import { ErrorBoundary, NotFound } from '~/app/pages/Error';
import HomePage from '~/app/pages/Home';
import TeacherPage from '~/app/pages/Teacher';

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                name: 'Trang Chủ',
                path: '',
                element: <HomePage />
            },
            {
                path: 'courses',
                children: [
                    { path: 'create', element: <CoursePage /> },
                    { path: ':slug', element: <CoursePage /> }
                ]
            },
            {
                path: 'teachers',
                children: [
                    { path: 'create', element: <TeacherPage /> },
                    { path: ':slug', element: <TeacherPage /> }
                ]
            }
        ],
        errorElement: <ErrorBoundary />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;

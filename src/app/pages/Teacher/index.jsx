import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { teacherService } from '~/services';
import { useTitle } from '~/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import NProgress from '~/config/nprogress';
import { logger } from '~/utils';
import { Button } from '~/components/UI';
import {
    CoreSection,
    CountSection,
    FeedbackSection,
    OverviewSection,
    ProfileSection,
    SummarySection
} from '~/app/sections';
import { useForm } from 'react-hook-form';
import { schema } from '~/validators/teacher.validator';
import { NotFound } from '~/app/pages/Error';

const TeacherPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFound, setIsFound] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch
    } = useForm({
        resolver: joiResolver(schema)
    });
    useTitle(slug ? watch('name') : 'Tạo mới');

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                NProgress.start();
                setIsLoading(true);
                const data = await teacherService.getOne({ slug });
                if (data) reset(data);
                else setIsFound(false);
            } catch (error) {
                logger('get teacher', error);
                setIsFound(false);
            } finally {
                NProgress.done();
                setIsLoading(false);
            }
        })();
    }, [navigate, reset, slug]);

    if (!isLoading && !isFound) return <NotFound />;

    const onSubmit = async ({ id, ...data }) => {
        try {
            NProgress.start();
            setIsLoading(true);
            await teacherService.createOrUpdate(id, data);
            navigate('/?tab=teachers');
        } catch (error) {
            logger('create teacher', error);
        } finally {
            NProgress.done();
            setIsLoading(false);
        }
    };

    return (
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
            <div className='min-h-16 flex justify-center items-center'>
                <h1 className='text-3xl text-gray-900 font-bold text-center'>
                    {watch('name')}
                </h1>
            </div>
            <div>
                <hr className='mb-5' />
                <ProfileSection
                    register={register}
                    watch={watch}
                    errors={errors}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <CountSection
                    register={register}
                    control={control}
                    errors={errors?.countSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <OverviewSection
                    register={register}
                    errors={errors?.overviewSection}
                    isLoading={isLoading}
                />

                <hr className='mb-5' />
                <SummarySection
                    register={register}
                    watch={watch}
                    control={control}
                    errors={errors?.summarySection}
                    isLoading={isLoading}
                />

                <hr className='mb-5' />
                <CoreSection
                    register={register}
                    control={control}
                    errors={errors?.coreSection}
                    isLoading={isLoading}
                />

                <hr className='mb-5' />
                <FeedbackSection
                    register={register}
                    watch={watch}
                    control={control}
                    errors={errors?.feedbackSection}
                    isLoading={isLoading}
                />
            </div>
            <hr className='mb-5' />
            <div className='flex gap-3 mb-5'>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                    type='submit'
                >
                    Lưu
                </Button>
                <Button
                    to='/?tab=teachers'
                    variant='light'
                    disabled={isLoading}
                >
                    Hủy
                </Button>
            </div>
        </form>
    );
};

export default TeacherPage;

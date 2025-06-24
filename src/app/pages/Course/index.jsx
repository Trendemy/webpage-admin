import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle } from '~/hooks';
import { courseService } from '~/services';
import NProgress from '~/config/nprogress';
import { logger } from '~/utils';
import { Button } from '~/components/UI';
import {
    ContentSection,
    GoalSection,
    HeroSection,
    ValueSection,
    IntroduceSection,
    ProductSection,
    WhoJoinSection,
    CourseInfoSection,
    FeedbackSection,
    TeacherSection,
    GraduationSection
} from '~/app/sections';
import { schema } from '~/validators/course.validator';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

const CoursePage = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
                const data = await courseService.getOne({ slug });
                if (data) reset(data);
                else navigate('/', { replace: true });
            } catch (error) {
                logger('error load course', error);
                navigate('/', { replace: true });
            } finally {
                NProgress.done();
                setIsLoading(false);
            }
        })();
    }, [navigate, reset, slug]);

    const onSubmit = async ({ id, ...data }) => {
        try {
            NProgress.start();
            setIsLoading(true);
            await courseService.createOrUpdate(id, data);
            navigate('/');
        } catch (error) {
            logger('create course', error);
        } finally {
            NProgress.done();
            setIsLoading(false);
        }
    };

    return (
        <form className='container' onSubmit={handleSubmit(onSubmit)}>
            <div className='min-h-16 flex justify-center items-center'>
                <h1 className='text-3xl font-bold text-center'>
                    {watch('name')}
                </h1>
            </div>
            <div>
                <hr className='mb-5' />
                <CourseInfoSection
                    register={register}
                    errors={errors}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <HeroSection
                    register={register}
                    watch={watch}
                    errors={errors?.heroSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <IntroduceSection
                    register={register}
                    watch={watch}
                    errors={errors?.introduceSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <GoalSection
                    register={register}
                    watch={watch}
                    control={control}
                    errors={errors?.goalSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <ContentSection
                    register={register}
                    control={control}
                    errors={errors?.contentSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <ValueSection
                    register={register}
                    watch={watch}
                    control={control}
                    errors={errors?.valueSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <WhoJoinSection
                    register={register}
                    watch={watch}
                    control={control}
                    errors={errors?.joinSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <GraduationSection
                    register={register}
                    control={control}
                    errors={errors?.graduationSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <TeacherSection
                    register={register}
                    control={control}
                    errors={errors?.teacherSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
                <FeedbackSection
                    register={register}
                    withImagePreview
                    watch={watch}
                    control={control}
                    errors={errors?.feedbackSection}
                    isLoading={isLoading}
                />

                <hr className='mb-5' />
                <ProductSection
                    register={register}
                    control={control}
                    errors={errors?.productSection}
                    isLoading={isLoading}
                />
                <hr className='mb-5' />
            </div>
            <div className='flex gap-3 mb-5'>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                    type='submit'
                >
                    Lưu
                </Button>
                <Button to='/' variant='light' disabled={isLoading}>
                    Hủy
                </Button>
            </div>
        </form>
    );
};

export default CoursePage;

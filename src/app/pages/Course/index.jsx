import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useHandleInputChange, useScrollToError, useTitle } from '~/hooks';
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
   Box,
   GraduationSection
} from '~/app/sections';

const CoursePage = () => {
   const { slug } = useParams();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const {
      state: course,
      setState: setCourse,
      errors,
      setErrors,
      handleInputChange,
      updateChildOfSection
   } = useHandleInputChange({
      name: '',
      type: '',
      heroSection: {
         title: '',
         highlightTitle: '',
         description: '',
         images: []
      },
      introduceSection: {
         title: '',
         highlightTitle: '',
         description: '',
         images: []
      },
      goalSection: {
         title: '',
         subtitle: '',
         content: [],
         images: []
      },
      contentSection: {
         title: '',
         subtitle: '',
         chapters: []
      },
      valueSection: {
         title: '',
         subtitle: '',
         content: [],
         images: []
      },
      joinSection: {
         title: '',
         objects: [],
         images: []
      },
      teacherSection: {
         title: '',
         subtitle: '',
         teachers: []
      },
      feedbackSection: {
         title: '',
         subtitle: '',
         feedbacks: [],
         images: []
      },
      graduationSection: {
         title: '',
         subtitle: '',
         images: []
      },
      productSection: {
         title: '',
         subtitle: '',
         images: []
      }
   });
   useTitle(slug ? course.name : 'Tạo mới');

   const { refs, scrollToError } = useScrollToError({
      name: 'courseInfo',
      type: 'courseInfo',
      slug: 'courseInfo',
      heroSection: 'heroSection',
      introduceSection: 'introduceSection',
      goalSection: 'goalSection',
      contentSection: 'contentSection',
      valueSection: 'valueSection',
      whoJoinSection: 'whoJoinSection',
      teacherSection: 'teacherSection',
      feedbackSection: 'feedbackSection',
      graduationSection: 'graduationSection',
      productSection: 'productSection'
   });

   useEffect(() => {
      if (!slug) return;
      (async () => {
         try {
            NProgress.start();
            setLoading(true);
            const data = await courseService.getOne({ slug });
            if (data) setCourse(data);
            else navigate('/404', { replace: true });
         } catch (error) {
            logger('error load course', error);
            navigate('/');
         } finally {
            NProgress.done();
            setLoading(false);
         }
      })();
   }, [navigate, setCourse, slug]);

   const handleSubmit = async () => {
      try {
         NProgress.start();
         setLoading(true);
         const { isValid, errors } = await courseService.createOrUpdate(
            course?.id,
            course
         );
         if (isValid) {
            toast.success('Thao tác thành công!');
            navigate('/?tab=courses');
         } else {
            setErrors(errors);
            scrollToError(errors);
         }
      } catch (error) {
         logger('error submit course', error);
      } finally {
         NProgress.done();
         setLoading(false);
      }
   };

   return (
      <div className='container'>
         <h1 className='text-3xl font-bold text-center mb-10'>
            {course?.name}
         </h1>
         <Box loading={loading}>
            <hr className='mb-5' />
            <CourseInfoSection
               name={course.name}
               type={course.type}
               slug={course.slug}
               onInputChange={handleInputChange}
               errors={errors}
               ref={refs.courseInfo}
            />
            <hr className='mb-5' />
            <HeroSection
               section={course.heroSection}
               onInputChange={handleInputChange}
               errors={errors.heroSection}
               ref={refs.heroSection}
            />
            <hr className='mb-5' />
            <IntroduceSection
               section={course.introduceSection}
               onInputChange={handleInputChange}
               errors={errors.introduceSection}
               ref={refs.introduceSection}
            />
            <hr className='mb-5' />
            <GoalSection
               section={course.goalSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.goalSection}
               ref={refs.goalSection}
            />
            <hr className='mb-5' />
            <ContentSection
               section={course.contentSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.contentSection}
               ref={refs.contentSection}
            />
            <hr className='mb-5' />
            <ValueSection
               section={course.valueSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.valueSection}
               ref={refs.valueSection}
            />
            <hr className='mb-5' />
            <WhoJoinSection
               section={course.joinSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.joinSection}
               ref={refs.whoJoinSection}
            />
            <hr className='mb-5' />
            <GraduationSection
               section={course.graduationSection}
               onInputChange={handleInputChange}
               errors={errors.graduationSection}
               ref={refs.graduationSection}
            />
            <hr className='mb-5' />
            <TeacherSection
               section={course.teacherSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.teacherSection}
               ref={refs.teacherSection}
            />
            <hr className='mb-5' />
            <FeedbackSection
               section={course.feedbackSection}
               imagesPreview
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.feedbackSection}
               ref={refs.feedbackSection}
            />
            <hr className='mb-5' />
            <ProductSection
               section={course.productSection}
               onInputChange={handleInputChange}
               errors={errors.productSection}
               ref={refs.productSection}
            />
            <hr className='mb-5' />
         </Box>
         <div className='flex gap-3 mb-5'>
            <Button onClick={handleSubmit} disabled={loading} loading={loading}>
               Lưu
            </Button>
            <Button to='/' variant='light' disabled={loading}>
               Hủy
            </Button>
         </div>
      </div>
   );
};

export default CoursePage;

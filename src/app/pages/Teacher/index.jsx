import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { teacherService } from '~/services';
import { useHandleInputChange, useScrollToError, useTitle } from '~/hooks';
import NProgress from '~/config/nprogress';
import { logger } from '~/utils';
import { Button } from '~/components/UI';
import {
   Box,
   CoreSection,
   CountSection,
   FeedbackSection,
   OverviewSection,
   ProfileSection,
   SummarySection
} from '~/app/sections';

const TeacherPage = () => {
   const { slug } = useParams();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const {
      state: teacher,
      setState: setTeacher,
      errors,
      setErrors,
      handleInputChange,
      updateChildOfSection
   } = useHandleInputChange({
      avatar: '',
      name: '',
      specialized: '',
      description: '',
      facebook: '',
      linkedIn: '',
      countSection: [],
      overviewSection: {
         title: '',
         description: ''
      },
      summarySection: {
         title: '',
         subtitle: '',
         education: [
            { icon: '', year: '', title: '', details: '' },
            { icon: '', year: '', title: '', details: '' },
            { icon: '', year: '', title: '', details: '' },
            { icon: '', year: '', title: '', details: '' },
            { icon: '', year: '', title: '', details: '' }
         ],
         experience: []
      },
      coreSection: {
         title: '',
         subtitle: '',
         content: []
      },
      feedbackSection: {
         title: '',
         subtitle: '',
         feedbacks: [],
         images: []
      }
   });
   useTitle(slug ? teacher.name : 'Tạo mới');

   const { refs, scrollToError } = useScrollToError({
      avatar: 'profileSection',
      name: 'profileSection',
      specialized: 'profileSection',
      description: 'profileSection',
      facebook: 'profileSection',
      linkedIn: 'profileSection',
      countSection: 'countSection',
      overviewSection: 'overviewSection',
      summarySection: 'summarySection',
      coreSection: 'coreSection',
      feedbackSection: 'feedbackSection'
   });

   useEffect(() => {
      if (!slug) return;
      (async () => {
         try {
            NProgress.start();
            setLoading(true);
            const data = await teacherService.getOne({ slug });
            if (data) setTeacher(data);
            else navigate('/404', { replace: true });
         } catch (error) {
            logger('get teacher', error);
         } finally {
            NProgress.done();
            setLoading(false);
         }
      })();
   }, [navigate, setTeacher, slug]);

   const handleSubmit = async () => {
      try {
         NProgress.start();
         setLoading(true);
         const { isValid, errors } = await teacherService.createOrUpdate(
            teacher?.id,
            teacher
         );
         if (isValid) {
            toast.success('Thao tác thành công!');
            navigate('/?tab=teachers');
         } else {
            setErrors(errors);
            scrollToError(errors);
         }
      } catch (error) {
         logger('create teacher', error);
      } finally {
         NProgress.done();
         setLoading(false);
      }
   };

   return (
      <div className='container'>
         <h1 className='text-3xl text-gray-900 font-bold text-center mb-10'>
            {teacher?.name}
         </h1>
         <Box loading={loading}>
            <hr className='mb-5' />
            <ProfileSection
               avatar={teacher.avatar}
               name={teacher.name}
               specialized={teacher.specialized}
               description={teacher.description}
               facebook={teacher.facebook}
               linkedIn={teacher.linkedIn}
               onInputChange={handleInputChange}
               errors={errors}
               ref={refs.profileSection}
            />
            <hr className='mb-5' />
            <CountSection
               section={teacher.countSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.countSection}
               ref={refs.countSection}
            />
            <hr className='mb-5' />
            <OverviewSection
               section={teacher.overviewSection}
               onInputChange={handleInputChange}
               errors={errors.overviewSection}
               ref={refs.overviewSection}
            />
            <hr className='mb-5' />
            <SummarySection
               section={teacher.summarySection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.summarySection}
               ref={refs.summarySection}
            />
            <hr className='mb-5' />
            <CoreSection
               section={teacher.coreSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.coreSection}
               ref={refs.coreSection}
            />
            <hr className='mb-5' />
            <FeedbackSection
               section={teacher.feedbackSection}
               onInputChange={handleInputChange}
               onUpdateChildOfSection={updateChildOfSection}
               errors={errors.feedbackSection}
               ref={refs.feedbackSection}
            />
         </Box>
         <hr className='mb-5' />
         <div className='flex gap-3 mb-5'>
            <Button onClick={handleSubmit} disabled={loading}>
               Lưu
            </Button>
            <Button to='/?tab=teachers' variant='light' disabled={loading}>
               Hủy
            </Button>
         </div>
      </div>
   );
};

export default TeacherPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from './components/FormSection/FormSection';
import ResumePreview from './components/ResumePreview/ResumePreview';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import dummyData from '../../data/dummyData';
import { useUser } from '@clerk/clerk-react';
import { useResumeStore } from '../../store/useResumeStore';

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState({});
  
  const { resumeDetails, getResumeById } = useResumeStore();

  useEffect(() => {
    if (resumeId) {
      console.log(resumeId)
      getResumeById(resumeId);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeDetails) {
      console.log('Fetched resumeDetails:', resumeDetails);
      setResumeInfo(resumeDetails);
    }
  }, [resumeDetails]);
  

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;

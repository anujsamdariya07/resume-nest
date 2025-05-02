import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Button } from '../ui/button';
import ResumePreview from '../EditResume/components/ResumePreview/ResumePreview';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import { useResumeStore } from '../../store/useResumeStore';
import { useParams } from 'react-router-dom';
import { RWebShare } from "react-web-share";

const ResumeView = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState({});

  const { resumeDetails, getResumeById } = useResumeStore();

  useEffect(() => {
    if (resumeId) {
      console.log(resumeId);
      getResumeById(resumeId);
    }
  }, [resumeId]);

  useEffect(() => {
    if (resumeDetails) {
      console.log('Fetched resumeDetails:', resumeDetails);
      setResumeInfo(resumeDetails);
    }
  }, [resumeDetails]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id='other-area'>
        <Header />

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congratulations! You're ultimate resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family!
          </p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: 'Share resume!',
                url: `${import.meta.env.VITE_DOMAIN}/my-resume/${resumeId}/view`,
                title: `${resumeDetails.firstName} ${resumeDetails.lastName}`,
              }}
              onClick={() => console.log('shared successfully!')}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id='print-area'>
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeView;
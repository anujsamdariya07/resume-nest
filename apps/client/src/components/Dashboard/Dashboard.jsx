import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';
import { useUser } from '@clerk/clerk-react';
import { useResumeStore } from '../../store/useResumeStore';

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const { resumes, createResume, getResumesByUserEmail } = useResumeStore();
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getResumesByUserEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user, getResumesByUserEmail]);

  useEffect(() => {
    setResumeList(resumes);
  }, [resumes]);

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI Resume For Your Next Job Profile</p>

      <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <AddResume />

        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

import { Notebook } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom'

const ResumeCardItem = ({resume}) => {
  return (
    <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
      <div
        className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex justify-center items-center h-[280px] rounded-lg hover:scale-100 transition-all hover:shadow-md cursor-pointer border-2'
        style={{ borderColor: resume?.themeColor }}
      >
        {/* <Notebook /> */}
        <img src="/resume-icon.png" width={80} height={80} alt="" />
      </div>
      <h2 className='text-center my-1'>{resume?.title}</h2>
    </Link>
  );
}

export default ResumeCardItem
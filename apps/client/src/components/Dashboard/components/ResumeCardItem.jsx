import { Notebook } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom'

const ResumeCardItem = ({resume}) => {
  return (
    <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
      <div className='p-14 bg-secondary flex justify-center items-center h-[280px] border-primary rounded-lg hover:scale-100 transition-all hover:shadow-md cursor-pointer border-2'>
        <Notebook/>
      </div>
      <h2 className='text-center my-1'>{resume?.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
import React from 'react'

const ProfessionalExperience = ({resumeInfo}) => {
  return (
    <div className='my-6 font-semibold'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color: resumeInfo?.themeColor}}>
        Professional Experience
      </h2>

      <hr style={{borderColor: resumeInfo?.themeColor}} />
      
      {Array.isArray(resumeInfo?.experience) &&
        resumeInfo.experience.map((experience, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor}}>{experience?.title}</h2>
            <h2 className='text-xs flex justify-between'>
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span className='text-xs font-semibold'>
                {experience?.startDate} To {experience?.currentlyWorking? 'Present': experience?.endDate}
              </span>
            </h2>
            <div className='text-xs font-normal' dangerouslySetInnerHTML={{__html: experience?.workSummary}} />
          </div>
      ))}

    </div>
  )
}

export default ProfessionalExperience
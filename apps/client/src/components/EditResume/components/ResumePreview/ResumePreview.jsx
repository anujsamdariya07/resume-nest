import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import PersonalDetails from './components/PersonalDetails'
import Summary from './components/Summary'
import ProfessionalExperience from './components/ProfessionalExperience'
import EducationPreview from './components/EducationPreview'
import SkillPreview from './components/SkillPreview'

const ResumePreview = () => {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  
  return (
    <div
      className='shadow-lg h-full p-14 border-t-[10px]'
      style={{ borderColor: resumeInfo.themeColor }}
    >
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo} />

      {/* Summary */}
      <Summary resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ProfessionalExperience resumeInfo={resumeInfo} />

      {/* Educational */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview
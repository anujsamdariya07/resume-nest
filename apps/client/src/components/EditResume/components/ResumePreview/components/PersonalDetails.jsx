import React from 'react'

const PersonalDetails = ({resumeInfo}) => {
  return (
    <div className='font-semibold'>
      <h2 className='font-bold text-xl text-center' style={{color: resumeInfo?.themeColor}}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className='text-center text-sm font-medium capitalize'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-center font-semibold text-xs'>{resumeInfo?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='font-semibold text-xs'>{resumeInfo?.phone}</h2>
        <h2 className='font-semibold text-xs'>{resumeInfo?.email}</h2>
      </div>
      <hr className='border-[1.5px] my-2' style={{borderColor: resumeInfo?.themeColor}} />
    </div>
  );
}

export default PersonalDetails
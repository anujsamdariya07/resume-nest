import React from 'react'

const Summary = ({resumeInfo}) => {
  return (
    <p className='text-xs font-normal'>
      {resumeInfo?.summary}
    </p>
  )
}

export default Summary
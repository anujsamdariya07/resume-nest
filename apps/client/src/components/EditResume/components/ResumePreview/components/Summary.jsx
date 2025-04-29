import React from 'react'

const Summary = ({resumeInfo}) => {
  return (
    <p className='text-xs font-semibold'>
      {resumeInfo?.summary}
    </p>
  )
}

export default Summary
import React from 'react'
import { useParams } from 'react-router-dom'

const EditResume = () => {
  const {resumeId} = useParams()
  
  return (
    <div>EditResume: {resumeId}</div>
  )
}

export default EditResume
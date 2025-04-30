import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext'
import {Input} from '../../../../ui/input'
import { Button } from '../../../../ui/button'
import { useResumeStore } from '../../../../../store/useResumeStore'
import {useParams} from 'react-router-dom'
import {LoaderCircle} from 'lucide-react'
import { toast } from 'sonner'

const PersonalDetail = ({enabledNext}) => {
  const {updateResume} = useResumeStore()
  const {resumeId} = useParams()
  // console.log(resumeId)
  
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  const [loading, setLoading] = useState(false)
  
  const handleInputChange = (event) => {
    enabledNext(false)
    const {name, value} = event.target

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setLoading(true);
    enabledNext(true)
    
    console.log(resumeInfo)
    
    await updateResume(resumeId, {
      firstName: resumeInfo.firstName,
      lastName: resumeInfo.lastName,
      jobTitle: resumeInfo.jobTitle,
      address: resumeInfo.address,
      email: resumeInfo.email,
      phone: resumeInfo.phone,
    })
    setLoading(false);
    toast('Details Updated✅!')
  }
  
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={handleSave} action="">
        <div className='grid grid-cols-2 mt-5 gap-3 font-semibold'>
          <div>
            <label className='text-sm' >First Name</label>
            <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm' >Last Name</label>
            <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' >Job Title</label>
            <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' >Address</label>
            <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm' >Phone</label>
            <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm' >Email</label>
            <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
          </div>
          <div className='mt-3 flex justify-end col-span-2'>
            <Button disabled={loading} type='submit'>
              {loading? (
                <LoaderCircle className='animate-spin'/>
              ) : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
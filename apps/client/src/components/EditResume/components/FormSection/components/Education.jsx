import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../ui/input';
import { Textarea } from '../../../../ui/textarea';
import { Button } from '../../../../ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { toast } from 'sonner';
import { axiosInstance } from '../../../../../lib/axios';
import { useResumeStore } from '../../../../../store/useResumeStore';
import { useParams } from 'react-router-dom';

const Education = ({ enabledNext }) => {
  const [educationList, setEducationList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const {updateResume} = useResumeStore()

  const {resumeId} = useParams()

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const onSave = async (resumeId, educationList, updateResume) => {
    setLoading(true);
    try {
      const updatedResume = await updateResume(resumeId, {
        education: educationList,
      });
      console.log('Education updated successfully:', updatedResume);
      toast.success('Education updated!')
      return updatedResume;
    } catch (error) {
      console.error('Failed to update education:', error);
      toast.error('Error updating!')
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationList.map((item, index) => (
          <div>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label htmlFor=''>University Name</label>
                <Input
                  name='universityName'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label htmlFor=''>Degree</label>
                <Input
                  name='degree'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label htmlFor=''>Major</label>
                <Input
                  name='major'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label htmlFor=''>Start Date</label>
                <Input
                  name='startDate'
                  type='date'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label htmlFor=''>End Date</label>
                <Input
                  name='endDate'
                  type='date'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div className='col-span-1'>
                <label htmlFor=''>Description</label>
                <Textarea
                  name='description'
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex mt-1 justify-between'>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              onClick={RemoveEducation}
              className='text-primary'
            >
              - Remove Education
            </Button>
            <Button
              variant='outline'
              onClick={AddNewEducation}
              className='text-primary'
            >
              + Add More Education
            </Button>
          </div>
        </div>
        <Button disabled={loading} onClick={() => onSave(resumeId, educationList, updateResume)} type='submit'>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Education;

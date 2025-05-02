import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../ui/input';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '../../../../ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useResumeStore } from '../../../../../store/useResumeStore';

const Skills = ({ enabledNext }) => {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const { resumeId } = useParams();
  const { updateResume } = useResumeStore();

  const AddNewSkill = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0,
    }]);
  };

  const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedResume = await updateResume(resumeId, {
        skills: skillsList,
      });
      toast.success('Skills Updated!');
      return updatedResume;
    } catch (error) {
      console.error('Failed to update skills:', error);
      toast.error('Error updating!');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(resumeInfo?.skills) && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top professional skills</p>

      <div>
        {Array.isArray(skillsList) &&
          skillsList.map((skill, index) => (
            <div className='flex justify-between items-center border rounded-lg p-3 mb-2' key={index}>
              <div>
                <label htmlFor='' className='text-xs'>
                  Name
                </label>
                <Input
                  className='w-full'
                  value={skill?.name}
                  onChange={(event) =>
                    handleChange(index, 'name', event.target.value)
                  }
                />
              </div>
              <div>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={skill?.rating}
                  onChange={(value) => handleChange(index, 'rating', value)}
                />
              </div>
            </div>
          ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex mt-1 justify-between'>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              onClick={RemoveSkill}
              className='text-primary'
            >
              - Remove Skill
            </Button>
            <Button
              variant='outline'
              onClick={AddNewSkill}
              className='text-primary'
            >
              + Add Skill
            </Button>
          </div>
        </div>
        <Button
          disabled={loading}
          onClick={() => onSave(resumeId, skillsList, updateResume)}
          type='submit'
        >
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Skills;

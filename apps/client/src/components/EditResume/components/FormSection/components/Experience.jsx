import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import RichTextEditor from '../../../../RichTextEditor/RichTextEditor';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { GenerateWorkSummary } from '../../../../../service/AIModel';
import { toast } from 'sonner';
import { useResumeStore } from '../../../../../store/useResumeStore';
import { useParams } from 'react-router-dom';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
};

const prompt = `Give a work summary for the following information provided to you. The output must only contain a work summary of 3-4 lines. There must be nothing to output apart from the summary itself. I dont want any options, dont give me to choose from anything. Following is the information: `;

const Experience = () => {
  const [experienceList, setExperienceList] = useState([{ ...formField }]);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  const {updateResume} = useResumeStore()

  const {resumeId} = useParams()
  console.log(resumeId)

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (event, index) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (event, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = event.target.value;
    setExperienceList(newEntries);
  };

  const onSave = async (resumeId, experienceList, updateResume) => {
    setLoading(true);
    try {
      const updatedResume = await updateResume(resumeId, {
        experience: experienceList,
      });
      console.log('Experience updated successfully:', updatedResume);
      toast.success('Experience Updated!')
      return updatedResume;
    } catch (error) {
      console.error('Failed to update experience:', error);
      toast.error('Error updating!')
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateWorkSummary = async (index) => {
    setGenerating(true);
    const exp = experienceList[index];

    const fullPrompt = `${prompt}
    Position Title: ${exp.title}
    Company Name: ${exp.companyName}
    City: ${exp.city}
    State: ${exp.state}
    Start Date: ${exp.startDate}
    End Date: ${exp.endDate}
    Currently Working: ${exp.currentlyWorking || 'No'}`;

    try {
      const summary = await GenerateWorkSummary({ prompt: fullPrompt });

      const newEntries = [...experienceList];
      newEntries[index].workSummary = summary;
      setExperienceList(newEntries);
      toast.success('AI summary generated');
    } catch (error) {
      console.error('AI Summary generation failed', error);
      toast.error('Failed to generate summary');
    } finally {
      setGenerating(false);
    }
  };


  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
  
    updateResume(resumeId, { experience: experienceList });
  }, [experienceList]);
  

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, []);
  

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experiences</p>

        <div>
          {Array.isArray(experienceList) &&
            experienceList.map((item, index) => (
              <div key={index}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      Position Title
                    </label>
                    <Input
                      name='title'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.title}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      Company Name
                    </label>
                    <Input
                      name='companyName'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.companyName}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      City
                    </label>
                    <Input
                      name='city'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.city}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      State
                    </label>
                    <Input
                      name='state'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.state}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      Start Date
                    </label>
                    <Input
                      type='date'
                      name='startDate'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.startDate}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      End Date
                    </label>
                    <Input
                      type='date'
                      name='endDate'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.endDate}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold' htmlFor=''>
                      Currently Working
                    </label>
                    <Input
                      name='currentlyWorking'
                      onChange={(event) => handleChange(event, index)}
                      defaultValue={experienceList[index]?.currentlyWorking}
                    />
                  </div>
                  <div className='col-span-2'>
                    <div className='flex items-center justify-between my-2'>
                      <label className='text-xs font-semibold' htmlFor=''>
                        Work Summary
                      </label>
                      <Button
                        variant='outline'
                        size='sm'
                        type='button'
                        onClick={() => generateWorkSummary(index)}
                        className='border-primary text-primary flex gap-2'
                        disabled={generating}
                      >
                        {generating ? (
                          <LoaderCircle className='animate-spin' />
                        ) : (
                          <>
                            <Brain className='h-4 w-4' />
                            Generate from AI
                          </>
                        )}
                      </Button>
                    </div>
                    <div>
                      <RichTextEditor
                        value={item.workSummary}
                        defaultValue={experienceList[index]?.workSummary}
                        onRichTextEditorChange={(event) =>
                          handleRichTextEditor(event, 'workSummary', index)
                        }
                      />
                    </div>
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
                onClick={RemoveExperience}
                className='text-primary'
              >
                - Remove Experience
              </Button>
              <Button
                variant='outline'
                onClick={AddNewExperience}
                className='text-primary'
              >
                + Add More Experience
              </Button>
            </div>
          </div>
          <Button disabled={loading} onClick={() => onSave(resumeId, experienceList, updateResume)} type='submit'>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;

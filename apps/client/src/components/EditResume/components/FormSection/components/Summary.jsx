import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../../../ui/button';
import { Textarea } from '../../../../ui/textarea';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { useResumeStore } from '../../../../../store/useResumeStore';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GenerateSummary } from '../../../../../service/AIModel';

const prompt =
  'Write a professional and concise 4–5 line resume summary for a specific job title. The summary should highlight core responsibilities, key skills, and typical impact in the role, suitable for including at the top of a resume. Dont give any options, just return the summary no other word included.';

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { updateResume } = useResumeStore();
  const { resumeId } = useParams();

  const [summary, setSummary] = useState(resumeInfo.summary || '');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, summary }));
  }, [summary]);

  const handleSave = async (e) => {
    e.preventDefault();
    enabledNext(true);
    setLoading(true);

    try {
      await updateResume(resumeId, { summary });
      toast.success('Summary updated ✅');
    } catch (err) {
      toast.error('Failed to update summary ❌');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setGenerating(true);
    try {
      const generated = await GenerateSummary({
        prompt,
        jobTitle: resumeInfo.jobTitle,
      });
      setSummary(generated);
      toast.success('AI summary generated ✅');
    } catch (err) {
      console.log(err);
      toast.error('Failed to generate summary ❌');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Summary Detail</h2>
      <p>Add a summary for your job title!</p>

      <form className='mt-7' onSubmit={handleSave}>
        <div className='flex justify-between items-end'>
          <label>Add Summary</label>
          <Button
            variant='outline'
            size='sm'
            type='button'
            onClick={handleGenerateSummary}
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

        <Textarea
          className='mt-5'
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div className='mt-2 flex justify-end'>
          <Button disabled={loading} type='submit'>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Summary;

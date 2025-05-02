import React, { useState } from 'react';
import PersonalDetail from './components/PersonalDetail';
import { Button } from '../../../ui/button';
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './components/ThemeColor';

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  const { resumeId } = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to='/dashboard'>
            <Button className='flex gap-2' size='sm'>
              <Home /> Home
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex justify-center items-center gap-2'>
          {activeFormIndex > 1 && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}

          <Button
            className='flex gap-2'
            size='sm'
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Summary */}
      {activeFormIndex == 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Experience */}
      {activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Education Skill */}
      {activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Skills */}
      {activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* View the resume */}
      {activeFormIndex == 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;

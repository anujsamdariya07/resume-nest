import React, { useState } from 'react'
import PersonalDetail from './components/PersonalDetail'
import {Button} from '../../../ui/button'
import {ArrowLeft, ArrowRight, LayoutGrid} from 'lucide-react'
import Summary from './components/Summary'
import Experience from './components/Experience'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button className='flex gap-2' size='sm' variant={'outline'}>
          <LayoutGrid /> Theme
        </Button>
        <div className='flex justify-center items-center gap-2'>
          {activeFormIndex > 1 && (
            <Button size='sm' variant='outline' onClick={() => setActiveFormIndex(activeFormIndex-1)}>
              <ArrowLeft />
            </Button>
          )}

          <Button className='flex gap-2' size='sm' onClick={() => setActiveFormIndex(activeFormIndex+1)} disabled={!enableNext}>
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex == 1? <PersonalDetail enabledNext={(v) => setEnableNext(v)} />: null} 

      {/* Summary */}
      {activeFormIndex == 2? <Summary enabledNext={(v) => setEnableNext(v)} />: null} 

      {/* Experience */}
      {activeFormIndex == 3? <Experience enabledNext={(v) => setEnableNext(v)} />: null} 

      {/* Education Skill */}

      {/* Skills */}
    </div>
  );
}

export default FormSection
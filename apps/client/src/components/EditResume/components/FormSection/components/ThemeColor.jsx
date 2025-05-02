import React, { useContext, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../ui/popover';
import { Button } from '../../../../ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { useResumeStore } from '../../../../../store/useResumeStore';
import { toast } from 'sonner';

const ThemeColor = () => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#33FFA1',
    '#FF7133',
    '#71FF33',
    '#7133FF',
    '#FF3371',
    '#33FF71',
    '#3371FF',
    '#A1FF33',
    '#33A1FF',
    '#FF5733',
    '#5733FF',
    '#33FF5A',
    '#5A33FF',
    '#FF335A',
    '#335AFF',
  ];

  const [selectedColor, setSelectedColor] = useState('');

  const { updateResume } = useResumeStore();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const changeColor = (color) => {
    setSelectedColor(color);

    setResumeInfo((prev) => ({
      ...prev,
      themeColor: color,
    }));

    // Persist to store (and probably backend)
    if (resumeInfo.resumeId) {
      updateResume(resumeInfo.resumeId, { themeColor: color });
      toast.success('Theme Updated!');
    } else {
      console.error('Missing resumeId. Cannot update theme color.');
      toast.error('Error updating theme!');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='flex gap-2' size='sm' variant={'outline'}>
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='mb-2 text-md font-bold'>Select theme color:</h2>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((color, index) => (
            <div
              key={index}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                color === selectedColor ? 'border border-black' : null
              }`}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;

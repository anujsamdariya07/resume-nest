import React, { useEffect, useState } from 'react';
import { Loader2, PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useResumeStore } from '../../../store/useResumeStore';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const { user } = useUser();

  const { createResume } = useResumeStore();

  const navigation = useNavigate()

  const onCreate = () => {
    setIsLoading(true);

    const uuid = uuidv4();
    createResume({
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
    });
    console.log(resumeTitle, uuid);

    navigation(`/dashboard/resume/${uuid}/edit`)
    
    setIsLoading(false);
    setOpenDialog(false);
  };
  

  return (
    <div>
      <div
        className='p-14 py-24 border-2 border-black items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-100 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Give a title for your new resume
              <Input
                className={'my-2'}
                placeholder='Eg. Amazon_Resume'
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex gap-5 justify-end'>
              <Button onClick={() => setOpenDialog(false)} variant={'ghost'}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || isLoading}
                onClick={() => onCreate()}
              >
                {isLoading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;

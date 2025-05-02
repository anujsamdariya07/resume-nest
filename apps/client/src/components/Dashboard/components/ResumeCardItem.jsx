import { LoaderCircle, MoreVertical, Notebook } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { useResumeStore } from '../../../store/useResumeStore';
import { toast } from 'sonner';

const ResumeCardItem = ({ resume }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { deleteResume } = useResumeStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteResume(resume.resumeId);
      setOpenAlert(false);
      toast.success('Resume Deleted!');
    } catch (error) {
      console.error('Failed to delete resume:', error);
      toast.error('Error deleting!');
    }
    setLoading(false);
    setOpenAlert(false);
  };

  return (
    <div>
      <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
        <div
          className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex justify-center items-center h-[280px] rounded-t-lg hover:scale-100 transition-all hover:shadow-md cursor-pointer border-2'
          style={{ borderColor: resume?.themeColor }}
        >
          {/* <Notebook /> */}
          <img src='/resume-icon.png' width={80} height={80} alt='' />
        </div>
      </Link>
      <div
        className='border p-2 flex justify-between items-center text-white rounded-b-lg'
        style={{ backgroundColor: resume?.themeColor }}
      >
        <h2 className='text-center my-1'>{resume?.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.resumeId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={loading} onClick={handleDelete}>
                {loading ? <LoaderCircle className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCardItem;

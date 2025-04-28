import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  isResumesLoading: false,

  getResumes: async () => {
    set({ isResumesLoading: true });
    try {
      const res = await axiosInstance.get('/resumes');
      set({ resumes: res.data });
    } catch (error) {
      console.log('An error occurred in getResumes!', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch resumes.');
    } finally {
      set({ isResumesLoading: false });
    }
  },

  createResume: async (resumeData) => {
    const { resumes } = get();
    try {
      const res = await axiosInstance.post('/resumes/create', resumeData);
      set({ resumes: [...resumes, res.data] });
      toast.success('Resume created successfully!');
    } catch (error) {
      console.log('An error occurred in createResume!', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to create resume.');
    }
  },

  deleteResume: async (resumeId) => {
    const { resumes } = get();
    try {
      await axiosInstance.delete(`/resumes/${resumeId}`);
      set({ resumes: resumes.filter((resume) => resume._id !== resumeId) });
      toast.success('Resume deleted successfully!');
    } catch (error) {
      console.log('An error occurred in deleteResume!', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to delete resume.');
    }
  },

}));

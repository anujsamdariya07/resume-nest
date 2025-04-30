import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
// import axios from 'axios';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  resumeDetails: null,
  isResumesLoading: false,

  getResumes: async () => {
    set({ isResumesLoading: true });
    try {
      const res = await axiosInstance.get('/resumes');
      set({ resumes: res.data });
    } catch (error) {
      console.log(
        'An error occurred in getResumes!',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to fetch resumes.');
    } finally {
      set({ isResumesLoading: false });
    }
  },

  // getResumeById: async (resumeId) => {
  //   set({ isResumeLoading: true });
  //   try {
  //     const res = await axiosInstance.get(`/resumes/${resumeId}`);
  //     set({ resumeDetails: res.data });
  //     return res.data;
  //   } catch (error) {
  //     console.error('Error fetching resume:', error);
  //     toast.error('Failed to load resume.');
  //     return null;
  //   } finally {
  //     set({ isResumeLoading: false });
  //   }
  // },

  getResumeById: async (resumeId) => {
    set({ isResumesLoading: true });
    try {
      const res = await axiosInstance.get(`/resumes/resume/${resumeId}`);
      set({ resumeDetails: res.data });
    } catch (error) {
      console.error('Error fetching resume by ID:', error.message);
      toast.error('Failed to fetch resume');
    } finally {
      set({ isResumesLoading: false });
    }
  },
  

  getResumesByUserEmail: async (userEmail) => {
    set({ isResumesLoading: true });

    try {
      const res = await axiosInstance.get(`/resumes/${userEmail}`);
      console.log(res.data);
      set({ resumes: res.data });
    } catch (error) {
      console.log(
        'Error in getResumesByUserEmail:',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to fetch resumes');
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
      console.log(
        'An error occurred in createResume!',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to create resume.');
    }
  },

  updateResume: async (resumeId, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/resumes/update/${resumeId}`,
        updatedData
      );

      set((state) => ({
        resumes: state.resumes.map((resume) =>
          resume.resumeId === resumeId ? response.data : resume
        ),
      }));

      return response.data;
    } catch (error) {
      console.error('Failed to update resume:', error);
      throw error;
    }
  },

  deleteResume: async (resumeId) => {
    const { resumes } = get();
    try {
      await axiosInstance.delete(`/resumes/${resumeId}`);
      set({ resumes: resumes.filter((resume) => resume._id !== resumeId) });
      toast.success('Resume deleted successfully!');
    } catch (error) {
      console.log(
        'An error occurred in deleteResume!',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to delete resume.');
    }
  },
}));

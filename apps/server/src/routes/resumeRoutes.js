import express from 'express';
import {
  getResumes,
  createResume,
  deleteResume,
  getResumesByUserEmail,
  updateResume
} from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', getResumes);

router.get('/:userEmail', getResumesByUserEmail);

router.post('/create', createResume);

router.put('/update/:resumeId', updateResume);

router.delete('/:resumeId', deleteResume);

export default router;

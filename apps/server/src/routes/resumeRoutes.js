import express from 'express';
import {
  getResumes,
  createResume,
  deleteResume,
  getResumesByUserEmail
} from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', getResumes);
router.get('/:userEmail', getResumesByUserEmail);
router.post('/create', createResume);
router.delete('/:resumeId', deleteResume);

export default router;

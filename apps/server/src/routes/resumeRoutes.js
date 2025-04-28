import express from 'express';
import {
  getResumes,
  createResume,
  deleteResume,
} from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', getResumes);
router.post('/create', createResume);
router.delete('/:resumeId', deleteResume);

export default router;

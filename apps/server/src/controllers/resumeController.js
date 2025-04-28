import Resume from '../models/resume.model.js';

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userEmail: req.body });
    return res.status(200).json(resumes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch resumes', error: error.message });
  }
};

export const createResume = async (req, res) => {
  const { title, resumeId, userEmail, username } = req.body;

  if (!title || !resumeId || !userEmail || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newResume = await Resume.create({
      title,
      resumeId,
      userEmail,
      username,
    });
    
    console.log('HERE');
    return res.status(201).json(newResume);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to create resume', error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const deletedResume = await Resume.findOneAndDelete({ resumeId });
    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to delete resume', error: error.message });
  }
};
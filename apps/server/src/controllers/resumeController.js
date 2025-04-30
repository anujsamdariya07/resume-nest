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

export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ resumeId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getResumesByUserEmail = async (req, res) => {
  const { userEmail } = req.params;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const resumes = await Resume.find({ userEmail });
    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch resumes by user email',
      error: error.message,
    });
  }
};

// export const updateResume = async (req, res) => {
//   const { resumeId } = req.params;
//   const { firstName, lastName, address, jobTitle, email, phone, summary } = req.body;

//   const updateData = {};
//   if (firstName !== undefined) updateData.firstName = firstName;
//   if (lastName !== undefined) updateData.lastName = lastName;
//   if (address !== undefined) updateData.address = address;
//   if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
//   if (email !== undefined) updateData.email = email;
//   if (phone !== undefined) updateData.phone = phone;
//   if (summary !== undefined) updateData.summary = summary;

//   try {
//     const updatedResume = await Resume.findOneAndUpdate(
//       { resumeId },
//       updateData,
//       { new: true }
//     );

//     if (!updatedResume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }

//     return res.status(200).json(updatedResume);
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to update resume', error: error.message });
//   }
// };

export const updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const updateData = {};

  for (const key in req.body) {
    if (req.body[key] !== undefined) {
      updateData[key] = req.body[key];
    }
  }

  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { resumeId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.status(200).json(updatedResume);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to update resume', error: error.message });
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

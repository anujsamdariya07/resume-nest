import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: String,
    companyName: String,
    city: String,
    state: String,
    startDate: String,
    endDate: String,
    currentlyWorking: String,
    workSummary: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    universityName: String,
    degree: String,
    major: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    resumeId: {
      type: String,
      required: true,
      unique: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    address: String,
    jobTitle: String,
    email: String,
    phone: String,
    summary: String,
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;

import mongoose, { Schema } from 'mongoose';
const jobSchema = new Schema({
  title:{
    type: String,
    required: [true, 'Job title is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  requirements: [{
    type: String,
  }],
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
  },
  experienceLevel:{
    type:Number,
    required:true,
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
  },
  jobType:{
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: [true, 'Job type is required'],
  },
  position:{
    type : Number,
    required: [true, 'Position is required'],
  },
  company: {
    type: Schema.Types.ObjectId,  
    ref: 'Company',
    required: [true, 'Company is required'],
  },
  created_by:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required'],
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application',
  }],

}, {timestamps: true });



export const Job = mongoose.model('Job', jobSchema);
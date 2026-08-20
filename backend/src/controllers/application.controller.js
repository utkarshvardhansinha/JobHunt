import {Application} from '../models/application.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';  
import { asyncHandler } from '../utils/asyncHandler.js';
import { Job } from '../models/job.model.js';

// students can apply for jobs
const applyForJob = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming the user is authenticated and user ID is available in req.user
  const jobId = req.params.id;
  if(!jobId){
    throw new ApiError(400, "Job ID is required");
  }
  // check if user already applied for the job
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId
  });
  if(existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
  }
  const job = await Job.findById(jobId)
  if(!job) {
    throw new ApiError(404, "Job not found");
  }
  const application = await Application.create({
    job: jobId,
    applicant: userId,
    status: "pending"
  });
  if(!application) {
    throw new ApiError(500, "Application failed");
  }
  // push application to job's applications array
  job.applications.push(application._id);
  await job.save({validateBeforeSave: false});

  return res.status(201).json(new ApiResponse(201, application, "Application submitted successfully"));
})

const getAppliedJobs = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const applications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
    path: 'job',
    options: {sort: {createdAt: -1}},
    populate:{
      path: "company",
      options: {sort: {createdAt: -1}}
    }
  })
  if(!applications || applications.length === 0) {
    throw new ApiError(404, "No applications found");
  }
  return res.status(200).json(new ApiResponse(200, applications, "Applications retrieved successfully"));
})

const getApplicantsForJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  if(!jobId) {
    throw new ApiError(400, "Job ID is required");
  }
  const job = await Job.findById(jobId).populate({
    path: 'applications',
    options: {sort: {createdAt: -1}},
    populate: {
      path: 'applicant',
      options: {sort: {createdAt: -1}},
    }
  })  
  if(!job) {
    throw new ApiError(404, "Job not found");
  }

  return res.status(200).json(new ApiResponse(200, job, "Applicants retrieved successfully"));
})

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const {status} = req.body;
  const applicationId = req.params.id;
  if(!applicationId) {
    throw new ApiError(400, "Application ID is required");
  }
  if(!status || !["pending", "accepted", "rejected"].includes(status)) {
    throw new ApiError(400, "Status is required and must be one of 'pending', 'accepted', or 'rejected'");
  }
  const application = await Application.findByIdAndUpdate(applicationId,
    {
      status: status
    },
    {
      new : true
    }
  )
  if(!application) {
    throw new ApiError(404, "Application not found");
  }
  return res.status(200).json(new ApiResponse(200, application, "Application status updated successfully")); 

})

export {
  applyForJob,
  getAppliedJobs,
  getApplicantsForJob,
  updateApplicationStatus
}


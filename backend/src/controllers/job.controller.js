import {Job} from '../models/job.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// admin creates a job
const postJob = asyncHandler(async (req, res) => {
  const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId } = req.body;
  if (!title || !description || !requirements || !salary || !experienceLevel || !location || !jobType || !position || !companyId) {
    throw new ApiError(400, "All fields are required");
  }
  const userId = req.user._id; // Assuming the user is authenticated and user ID is available in req.user
  if (!userId) {
    throw new ApiError(401, "Unauthorized access, user ID not found");
  }
  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(',').map(req => req.trim()),
    salary,
    experienceLevel,
    location,
    jobType,
    position,
    company: companyId, // Assuming companyId is passed in the request body
    created_by: userId,
  })
  if(!job) {
    throw new ApiError(500, "Job creation failed");
  }

  return res.status(201).json(new ApiResponse(201, job, "Job posted successfully"));

})
//students can apply for jobs, so we need to get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = {
    $or: [
      {title : {$regex: keyword, $options: 'i'}},
      {description: {$regex: keyword, $options: 'i'}},
    ]
  }

  const jobs = await Job.find(query)
  // we will see later how to paginate this

  if(!jobs || jobs.length === 0) {
    throw new ApiError(404, "No jobs found");
  }

  return res.status(200).json(new ApiResponse(200, jobs, "Jobs retrieved successfully"));

})

// students can apply for jobs, so we need to get the job by id
const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId)
  // we will see later how to paginate this
  if(!job) {
    throw new ApiError(404, "Job not found");
  }
  return res.status(200).json(new ApiResponse(200, job, "Job retrieved successfully"));
})
// how many jobs are posted by a admin
const getAdminJobs = asyncHandler(async (req, res) => {
  const adminId = req.user._id; // Assuming the user is authenticated and user ID is available in req.user
  if (!adminId) {
    throw new ApiError(401, "Unauthorized access, user ID not found");
  }
  const jobs = await Job.find({created_by: adminId})
  if(!jobs || jobs.length === 0) {
    throw new ApiError(404, "No jobs found for this admin");
  }
  return res.status(200).json(new ApiResponse(200, jobs, "Admin jobs retrieved successfully"));
})

export {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs  
  
}
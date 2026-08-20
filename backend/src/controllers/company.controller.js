import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerCompany = asyncHandler(async (req, res) => {
  const {companyName} = req.body
  console.log("Registering company:", companyName);
  if(!companyName) {
    throw new ApiError(400, "Company name is required");
  }
  const existingCompany = await Company.findOne({name: companyName});
  if(existingCompany) {
    throw new ApiError(400, "Company with this name already exists");
  }
  const userId = req.user._id; // Assuming the user is authenticated and user ID is available in req.user
  if(!userId) {
    throw new ApiError(401, "Unauthorized access, user ID not found");
  }
  const company = await Company.create({
    name : companyName,
    userId: userId,
  })

  return res.status(201).json(new ApiResponse(201, company, "Company registered successfully"));
})

const getCompany = asyncHandler(async (req, res) => {
  const companyId = req.user._id
  const companies = await Company.find({userId : companyId}) 
  if(companies.length === 0) {
    throw new ApiError(404, "Company not found");
  }

  return res.status(200).json(new ApiResponse(200, companies, "Company retrieved successfully"));

})
//why use params in this case?
const getCompanyById = asyncHandler(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findById(companyId);
  if(!company) {
    throw new ApiError(404, "Company not found");
  }
  return res.status(200).json(new ApiResponse(200, company, "Company retrieved successfully"));
  
})

const updateCompany = asyncHandler(async (req, res) => {
  const {name, description, website, location} = req.body;
  const file = req.file // cloudinary file object
  
  const updatedData = {}
  if(name) updatedData.name = name;
  if(description) updatedData.description = description;  
  if(website) updatedData.website = website;
  if(location) updatedData.location = location;

  const company = await Company.findByIdAndUpdate(req.params.id,  // why not req.user._id?
    {
      $set: updatedData, 
    },
    {
      new: true,
    }
  )

  if(!company) {
    throw new ApiError(404, "Company not found");
  }

  return res.status(200).json(new ApiResponse(200, company, "Company updated successfully"));
})

export {
  registerCompany,
  getCompany,
  getCompanyById, 
  updateCompany,
  
}

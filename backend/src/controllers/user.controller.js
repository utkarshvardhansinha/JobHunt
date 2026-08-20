import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
const generateAccessAndRefereshTokens = async(userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    // doubt
    await user.save({validateBeforeSave: false});
    return {
      accessToken,
      refreshToken
    };

  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
}

const registerUser = asyncHandler(async (req, res) => {

  
  const {fullName, email, phoneNumber, password, role} = req.body;
  if(!fullName || !email || !password || !phoneNumber || !role) {
    throw new ApiError(400, "All fields are required"); 
  }

  const existingUser = await User.findOne({
    $or: [{ email}, {phoneNumber }]
  });

  if(existingUser) {
    throw new ApiError(400, "User with this email or phone number already exists");
  }
console.log("Creating user...");

const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role
});

console.log("Created user:", user);

  const createdUser = await User.findById(user._id).select("-password");

  if(!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));

})


const loginUser = asyncHandler(async (req, res) => {
  const {email, password, role} = req.body;
  if(!email || !password || !role) {
    throw new ApiError(400, "Email, password and role are required");
  }
  const user = await User.findOne({email});
  if(!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if(!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }
  if(user.role !== role) {
    throw new ApiError(403, "You are not authorized to login as this role");
  }
   
  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);
  
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
  const options = {
    httpOnly: true,
    secure: true
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
      user: loggedInUser,
      accessToken,
      refreshToken
    }, "User logged in successfully"));

})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, 
    {
      $unset:{refreshToken: 1}
    },
    {
      new: true,
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
})

const updateProfile = asyncHandler(async (req, res) => {
  const {fullName, email, phoneNumber, bio, skills} = req.body
  
  const updatedData = {};
  
  //cloudinary upload for resume 
  const file = req.file?.path;
  if(file){
    const resume = await uploadOnCloudinary(file);
    if(!resume) {
      console.error("Cloudinary upload failed:", file);
      throw new ApiError(500, "Error uploading resume to Cloudinary");
    }
    updatedData.profile = updatedData.profile || {};
    updatedData.profile.resume = resume.secure_url;
    updatedData.profile.resumeOriginalName = resume.original_filename;
    console.log("Resume uploaded to Cloudinary:", resume.secure_url);
  }
  
  if (fullName) updatedData.fullName = fullName;
  if (email) updatedData.email = email;
  if (phoneNumber) updatedData.phoneNumber = phoneNumber;
  
  if (bio || (skills && skills.length > 0)) {
    if (bio) {
      updatedData.profile = updatedData.profile || {};
      updatedData.profile.bio = bio;
    }
    if (skills && skills.length > 0) {
      updatedData.profile = updatedData.profile || {};
      // Split skills by comma and trim whitespace
      const skillsArray = skills.split(",").map(skill => skill.trim());
      updatedData.profile.skills = skillsArray;
    } 
  }
  


  const user = await User.findByIdAndUpdate(req.user?._id, 
    {
      $set: updatedData
    },
    {
      new: true
    }
  ).select("-password -refreshToken");

  
  if(!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, { user }, "Profile updated successfully"));

})


export { 
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
};

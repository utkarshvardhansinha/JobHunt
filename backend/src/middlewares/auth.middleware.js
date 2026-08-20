import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const jwtVerify = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    // or we can do  req.headers.authorization?.replace("Bearer ", "")
    if (!token) {
      throw new ApiError(401, "Unauthorized access, no token provided");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decodedToken:", decodedToken); // Debugging line to check the token value
    const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
    // console.log("user:", user); // Debugging line to check the token value
    if (!user) {
      throw new ApiError(401, "Unauthorized access, user not found");
    }
    
    req.user = user;

    next();
  } catch (error) {
    return new ApiError(401, error?.message || "Unauthorized access, invalid token");
  }

})
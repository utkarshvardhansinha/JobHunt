import mongoose , {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  fullName: {
    type: String, 
    required: [true, 'Full name is required'],
    trim: true, 
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
  },
  phoneNumber: {
    type: String, 
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],  
  },
  role: {
    type : String,
    enum: ["student", "recruiter"],
  },
  profile:{
    bio: {type : String},
    skills: [{type : String}],
    resume: {type : String}, 
    resumeOriginalName: {type : String},
    profilephoto: {type : String, default : ""},
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    }
  },
  refreshToken: {
    type: String,
  }

}, {timestamps: true});



// encrypting password before saving

userSchema.pre("save", async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

//check if password is correct or not
userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

//generating access token and refresh token methods->
userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    id: this._id,
    role: this.role
  }, process.env.ACCESS_TOKEN_SECRET,{
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
 })
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    id: this._id,
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
}


export const User = mongoose.model('User', userSchema);  

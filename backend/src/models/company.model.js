import mongoose, { Schema } from 'mongoose';  

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String, 
  },
  userId: {  
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required'],
  },
}, {timestamps: true});



export const Company = mongoose.model('Company', companySchema);
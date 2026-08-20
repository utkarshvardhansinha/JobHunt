import mongoose, {Schema} from 'mongoose';

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,  
    ref: 'Job',
    required: [true, 'Job is required'],
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Applicant is required'],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, {
  timestamps: true});

export const Application = mongoose.model('Application', applicationSchema);  
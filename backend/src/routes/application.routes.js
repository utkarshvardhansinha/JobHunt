import {
  applyForJob,
  getAppliedJobs,
  getApplicantsForJob,
  updateApplicationStatus
} from '../controllers/application.controller.js';
import { jwtVerify } from '../middlewares/auth.middleware.js';
import { Router } from 'express';

const router = Router();
// check routes properly
router.route("/apply/:id").post(jwtVerify, applyForJob);
router.route("/get").get(jwtVerify, getAppliedJobs);
router.route("/:id/applicants").get(jwtVerify, getApplicantsForJob);
router.route("/status/:id/update").put(jwtVerify, updateApplicationStatus);

export default router;
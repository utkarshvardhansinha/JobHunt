import {
  getAllJobs,
  getJobById, 
  postJob,
  getAdminJobs
} from '../controllers/job.controller.js';
import { Router } from 'express';
import { jwtVerify } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/post').post(jwtVerify, postJob);
router.route('/get').get(jwtVerify, getAllJobs);
router.route('/get/:id').get(jwtVerify, getJobById);
router.route('/admin').get(jwtVerify, getAdminJobs);

export default router;
import { registerCompany,
  getCompany,
  getCompanyById, 
  updateCompany,} from '../controllers/company.controller.js';
import { Router } from 'express';
import { jwtVerify } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/register').post(jwtVerify, registerCompany);
router.route('/get').get(jwtVerify, getCompany);
router.route('/get/:id').get(jwtVerify, getCompanyById);  
router.route('/update/:id').put(jwtVerify, updateCompany);

export default router;
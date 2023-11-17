import {Router} from 'express';
import { test } from '../controllers/user.controllers.js';
import { updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verify.User.js';
const router = Router();


router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)

export default router;
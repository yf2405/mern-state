import {Router} from 'express';
import { getUserListings, test } from '../controllers/user.controllers.js';
import { updateUser, deleteUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verify.User.js';
const router = Router();


router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
export default router;
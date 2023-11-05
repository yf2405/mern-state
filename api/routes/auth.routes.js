
import {Router} from 'express';
import { signup } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signup', signup);


export default router;
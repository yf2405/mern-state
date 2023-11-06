
import {Router} from 'express';
import { signup } from '../controllers/auth.controllers.js';
import { signin } from '../controllers/auth.controllers.js';
const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
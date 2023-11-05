import {Router} from 'express';
import { test } from '../controllers/user.controllers.js';

const router = Router();


router.get('/test', test);

export default router;
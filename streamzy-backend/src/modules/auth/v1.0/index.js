import express from 'express';
const router = express.Router({mergeParams: true});
import auth from './auth';

router.post('/login', auth.login);
router.post('/signup', auth.signup);

export default router;

import express from 'express';
const router = express.Router({mergeParams: true});
import v1 from './v1.0';

router.use('/v1.0/', v1);

export default router;

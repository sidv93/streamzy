import express from 'express';
const router = express.Router();
import auth from './modules/auth';
import api from './modules/api';

router.get('/', (req, res) => {
    res.send('Streamzy home');
});

router.use('/auth', auth);
router.use('/api', api);
export default router;

import express from 'express';
const router = express.Router();
import auth from './auth';

router.get('/', (req, res) => {
    res.send('Streamzy home');
});

router.post('/login', auth.login);
router.post('/signup', auth.signup);

export default router;

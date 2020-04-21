import express from 'express';
const router = express.Router({mergeParams: true});
import api from './api';

router.get('/movies', api.getMovies);

export default router;

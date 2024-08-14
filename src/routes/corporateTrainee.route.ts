import express from 'express';
import controller from '@controllers/corporateTrainee.controller';

const router = express.Router();

router.post('/', controller.createCorporateTrainee);

export default router;

import express from 'express';
import controller from '../controllers/CorporateTrainee';

const router = express.Router();

router.post('/', controller.createCorporateTrainee);
router.get('/', controller.listCorporateTrainees);

export default router;

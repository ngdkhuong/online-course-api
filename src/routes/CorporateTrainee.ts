import express from 'express';
import controller from '../controllers/CorporateTrainee';

const router = express.Router();

router.post('/', controller.createCorporateTrainee);
router.get('/', controller.listCorporateTrainees);
router.get('/:corporateTraineeId', controller.readCorporateTrainee);
router.put('/:corporateTraineeId', controller.updateCorporateTrainee);

export default router;

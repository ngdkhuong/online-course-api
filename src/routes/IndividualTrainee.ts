import express from 'express';
import controller from '../controllers/IndividualTrainee';

const router = express.Router();

router.post('/', controller.createIndividualTrainee);
router.get('/', controller.listIndividualTrainees);
// router.get('/:individualTraineeId', controller.readIndividualTrainee);
// router.put('/:individualTraineeId', controller.updateIndividualTrainee);
// router.delete('/:individualTraineeId', controller.deleteIndividualTrainee);

export default router;

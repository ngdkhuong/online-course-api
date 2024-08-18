import express from 'express';
import controller from '../controllers/IndividualTrainee';
import isAuthenticated from '../middlewares/isAuthenticated';
import isAuthorized from '../middlewares/isAuthorized';
import { UserType } from '../enums/UserType';

const router = express.Router();

router.post('/', controller.createIndividualTrainee);
router.get('/', controller.listIndividualTrainees);
router.get('/:individualTraineeId', controller.readIndividualTrainee);
router.put('/:individualTraineeId', controller.updateIndividualTrainee);
router.delete('/:individualTraineeId', controller.deleteIndividualTrainee);

export default router;

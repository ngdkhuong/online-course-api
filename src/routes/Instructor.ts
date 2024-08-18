import express from 'express';
import controller from '../controllers/Instructor';
import isAuthenticated from '../middlewares/isAuthenticated';
// import ratingController from "../controllers/InstructorRating";
import { UserType } from '../enums/UserType';
import isAuthorized from '../middlewares/isAuthorized';

const router = express.Router();

router.post('/', controller.createInstructor);
router.get('/', controller.listInstructors);
router.get('/:instructorId', controller.readInstructor);
router.put('/:instructorId', isAuthenticated, controller.updateInstructor);
router.delete('/:instructorId', isAuthenticated, controller.deleteInstructor);
// router.post('/:instructorId/ratings', isAuthenticated, ratingController.createRating);
// router.delete('/:instructorId/ratings/:ratingId', isAuthenticated, ratingController.deleteRating);
// router.put('/:instructorId/my-rating/', isAuthenticated, ratingController.updateRating);
// router.get(
//     '/:instructorId/my-rating',
//     isAuthenticated,
//     isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
//     ratingController.getCourseRating,
// );

export default router;

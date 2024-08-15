import express from 'express';
import controller from '../controllers/Instructor';
// import ratingController from "../controllers/InstructorRating";
// import { UserType } from "../enums/UserTypes";
// import isAuthenticated from "../middleware/permissions/isAuthenticated";
// import isAuthorized from "../middleware/permissions/isAuthorized";

const router = express.Router();

router.post('/', controller.createInstructor);

export default router;

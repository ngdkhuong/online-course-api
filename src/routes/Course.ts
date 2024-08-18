import express from 'express';
import controller from '../controllers/Course';
import isAuthenticated from '../middlewares/isAuthenticated';
import isAuthorized from '../middlewares/isAuthorized';
import { UserType } from '../enums/UserType';

const router = express.Router();

// instructor
router.post('/', isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), controller.createCourse);

// all users
router.get('/', controller.listCourses);

export default router;

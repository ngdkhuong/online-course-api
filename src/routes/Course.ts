import express from 'express';
import controller from '../controllers/Course';
import isAuthenticated from '../middlewares/isAuthenticated';
import isAuthorized from '../middlewares/isAuthorized';
import { UserType } from '../enums/UserType';
import isCourseOwner from '../middlewares/isCourseOwner';
import ratingController from '../controllers/CourseRating';
import lessonController from '../controllers/Lesson';
import isEnrolled from '../middlewares/isEnrolled';
import exerciseController from '../controllers/Exercise';
import isRatingOwner from '../middlewares/isRatingOwner';
import isOwnerOrEnrolled from '../middlewares/isOwnerOrEnrolled';
import accessRequestController from '../controllers/AccessRequest';

const router = express.Router();

// all users
router.get('/', controller.listCourses);
router.get('/subjects', controller.listSubjects);
router.get('/:courseId', isAuthenticated, controller.readCourse);
router.get('/:courseId/ratings', ratingController.listRatings);
router.post('/:courseId/ratings', isAuthenticated, ratingController.createRating);
router.get(
    '/:courseId/my-rating',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE, UserType.CORPORATE_TRAINEE]),
    ratingController.readRating,
);
router.put(
    '/:courseId/my-rating',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE, UserType.CORPORATE_TRAINEE]),
    ratingController.updateRating,
);

// instructor
router.post('/', isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), controller.createCourse);

// instructor and isCourseOwner
router.put('/:courseId', isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), isCourseOwner, controller.updateCourse);

router.delete(
    '/:courseId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.deleteCourse,
);

router.delete(
    '/:courseId/lessons/:lessonId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    lessonController.deleteLesson,
);

router.post(
    '/:courseId/close',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.closeCourse,
);

router.post(
    '/:courseId/publish',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.publishCourse,
);

router.post(
    '/:courseId/open',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.reOpenCourse,
);

router.post(
    '/:courseId/lessons',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    lessonController.createLesson,
);

router.put(
    '/:courseId/lessons/:lessonId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    lessonController.updateLesson,
);

router.post(
    '/:courseId/lessons/:lessonId/exercises',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.createExercise,
);

router.put(
    '/:courseId/lessons/:lessonId/exercises/:exerciseId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.updateExercise,
);
router.delete(
    '/:courseId/lessons/:lessonId/exercises/:exerciseId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.deleteExercise,
);

router.delete(
    '/:courseId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.deleteCourse,
);

router.get(
    '/:courseId/lessons/:lessonId',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    lessonController.readLesson,
);
router.post(
    '/:courseId/ratings',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    isAuthenticated,
    ratingController.createRating,
);
router.get(
    '/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    exerciseController.readSubmission,
);
router.post(
    '/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    exerciseController.submitExercise,
);

// trainee and owner
router.put(
    '/:courseId/ratings/:ratingId',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isRatingOwner,
    ratingController.updateRating,
);
router.delete(
    '/:courseId/ratings/:ratingId',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isRatingOwner,
    ratingController.deleteRating,
);

// trainee and enrolled or Instructor and owner
router.get(
    '/:courseId/lessons/:lessonId/exercises',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR, UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isOwnerOrEnrolled,
    exerciseController.listExercises,
);
router.get(
    '/:courseId/lessons/:lessonId/exercises/:exerciseId',
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR, UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isOwnerOrEnrolled,
    exerciseController.readExercise,
);

// corporate trainee
router.post(
    '/:courseId/access-requests',
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE]),
    accessRequestController.createAccessRequest,
);

export default router;

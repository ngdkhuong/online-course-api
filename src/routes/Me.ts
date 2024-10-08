import express from 'express';
import courseController from '../controllers/Course';
import profileController from '../controllers/Profile';
import noteRouter from '../controllers/Note';
import isAuthenticated from '../middlewares/isAuthenticated';
import enrollmentController from '../controllers/Enrollment';
import accessRequestController from '../controllers/AccessRequest';
import instructorRatingController from '../controllers/InstructorRating';
import reportController from '../controllers/Report';
import isAuthorized from '../middlewares/isAuthorized';
import { UserType } from '../enums/UserType';
import RefundRequestController from '../controllers/RefundRequest';

import settlementController from '../controllers/Settlement';

const router = express.Router();

// router.get(
//     '/',
//     isAuthenticated,
//     isAuthorized([UserType.INDIVIDUAL_TRAINEE, UserType.CORPORATE_TRAINEE, UserType.INSTRUCTOR]),
//     profileController.readProfile,
// );

router.get('/courses', isAuthenticated, courseController.listMyCourses);

router.get('/enrollments', isAuthenticated, enrollmentController.readMyEnrollments);
router.post(
    '/enrollments',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE]),
    enrollmentController.createEnrollment,
);

// refund requests
router.get(
    '/enrollments/:enrollmentId/refunds',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE]),
    RefundRequestController.readRefundRequest,
);
router.post(
    '/enrollments/:enrollmentId/refunds',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE]),
    RefundRequestController.createRefundRequest,
);
router.delete(
    '/enrollments/:enrollmentId/refunds',
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE]),
    RefundRequestController.deleteRefundRequest,
);

router.get('/courses/:courseId/access-requests', isAuthenticated, accessRequestController.readAccessRequest);

router.get('/lessons/:lessonId/notes', isAuthenticated, noteRouter.readNote);
router.get('/lessons/:lessonId/notes/:noteId/pdf', isAuthenticated, noteRouter.saveAsPDF);
router.post('/lessons/:lessonId/notes', isAuthenticated, noteRouter.createNote);
router.put('/lessons/:lessonId/notes/:noteId', isAuthenticated, noteRouter.updateNote);

router.get('/ratings', isAuthenticated, instructorRatingController.listRatings);
router.get('/profile', isAuthenticated, profileController.readProfile);
router.put('/profile', isAuthenticated, profileController.updateProfile);

router.get('/reports', isAuthenticated, reportController.listReportsByUser);
router.get('/reports/:reportId', isAuthenticated, reportController.getReport);
router.post('/reports', isAuthenticated, reportController.createReport);
router.post('/reports/:reportId', isAuthenticated, reportController.addThreadReplyByReport);

// instructor settlement
router.get('/settlements', isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), settlementController.listSettlements);

export default router;

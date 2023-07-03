const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controller/refreshToken/refreshTokenController');
const verifyJWT = require('../../middleware/verifyJWT');
const userController = require('../../controller/users/userController');
const apiCourseController = require('../../controller/api/courseApi/courseApi');
const enrollmentCourseController = require('../../controller/enrollment/enrollment');
const paymentController = require('../../controller/payment/paymentController');
// Course Routes
// router.get('/courses',  courseController.getAllCourses);




router.get('/users/:id',verifyJWT.verifyJWT,    userController.getUserById);

//users 
router.post('/users/register',userController.registerUser);



router.post('/users/login',userController.loginUser);

//users email
//for sending verification email to the user 
router.get('/users/send-verification-email/:id',userController.sendVerificationEmail);

//for verifying emails when user visit the link page
router.get('/users/verify-email/:token',userController.verifyEmail);

router.get('/users/get-data/:email',userController.getUserByEmail);

// Topic Routes
// router.get('/topics',  topicController.getAllTopics);
// router.put('/topics/:id',  topicController.updateTopic);

router.get('/getcompletedtopics/:courseId/:emailId',apiCourseController.getCompletedTopics);

router.post('/markascomplete',apiCourseController.markAsComplete);




router.get('/refreshToken', refreshTokenController.handleRefreshToken);

router.get('/logout', userController.logoutUser);


//for courses 
router.get('/courses/',apiCourseController.courses);

router.get('/course/:id',apiCourseController.getcourse);
//for topics 
router.get('/gettopic/:id',apiCourseController.getTopicContent);

//change password
router.post('/users/change-password',verifyJWT.verifyJWT,userController.changePassword);


//send password for change password request 

router.post('/users/send-changed-password-email',userController.sendPasswordChangeEmail);


//for enrollment in courses 

router.post('/courses/enroll/',enrollmentCourseController.enrollCourse);


//for making payment 
router.post('/make-payment',paymentController.payment);

//for recent transaction details from users 
router.get('/users/recent-transactions/:id',paymentController.getTransactionsDetails);


module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuthentication = require('../../middleware/checkAdminAuthentication');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/courseuploadedimages/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})



const upload = multer({ storage: storage });

const adminController = require('../../controller/admin/adminController');
const courseController = require('../../controller/course/courseController');
const userController = require('../../controller/users/userController');
const paymentController = require('../../controller/payment/paymentController');

router.get('/', checkAdminAuthentication.checkAdminAuthentication ,adminController.admin);

//for login and logout
router.post('/user-session',adminController.adminLoginSession);


router.get('/logout',adminController.adminLogout);

//for courses
router.get('/add-courses',checkAdminAuthentication.checkAdminAuthentication,courseController.addCourseForm);
router.get('/view-courses',checkAdminAuthentication.checkAdminAuthentication,courseController.viewCourses);

router.post('/add-courses',checkAdminAuthentication.checkAdminAuthentication,upload.single('courseImage'),courseController.postCourse);


router.get('/edit-courses/:id',checkAdminAuthentication.checkAdminAuthentication,courseController.editCourseForm);

//post course
router.post('/edit-courses-post',checkAdminAuthentication.checkAdminAuthentication,upload.single('courseImage'),courseController.updateCourse);

router.get('/delete-course/:id',checkAdminAuthentication.checkAdminAuthentication,courseController.deleteCourse);

router.post('/export-excel-data',checkAdminAuthentication.checkAdminAuthentication,upload.single('excelFile'),courseController.importExcelData);


//users 

router.get('/view-users',checkAdminAuthentication.checkAdminAuthentication,userController.showUsers);
router.get('/delete-users-data-by-admin/:id',checkAdminAuthentication.checkAdminAuthentication,userController.deleteUserByAdmin);
router.get('/view-users-data-by-admin/:id',checkAdminAuthentication.checkAdminAuthentication,adminController.viewUserByAdmin);




//for topics 
router.get('/add-topics',checkAdminAuthentication.checkAdminAuthentication,courseController.addTopicsForm);
router.post('/add-topics-data',checkAdminAuthentication.checkAdminAuthentication,courseController.postTopics);



router.get('/view-topics',checkAdminAuthentication.checkAdminAuthentication,courseController.viewTopics);
router.get('/course/alltopics/:id',checkAdminAuthentication.checkAdminAuthentication,courseController.viewallTopics);
router.get('/delete-topic/:id', checkAdminAuthentication.checkAdminAuthentication,courseController.deleteTopic);
router.get('/edit-topic/:id', checkAdminAuthentication.checkAdminAuthentication,courseController.editTopicForm);

router.post('/edit-topics-data/:id', checkAdminAuthentication.checkAdminAuthentication,courseController.updateTopic);


router.get('/view-transactions/',paymentController.adminGetTransactionsDetails);


module.exports = router;

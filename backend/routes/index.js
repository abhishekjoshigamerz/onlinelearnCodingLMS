const express = require('express');
const router = express.Router();
const homeController = require('../controller/home/homeController');

router.get('/', homeController.home);

router.use('/admin', require('./admin/index'));
router.use('/api',require('./api/index'));

module.exports = router;
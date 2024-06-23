const express = require('express');
const router=express.Router();
const HomeController= require('../controllers/HomeController');

router.get('/',HomeController.home);
router.get('/index',HomeController.index);
router.get('/nongtrai',HomeController.nongtrai);
router.get('/find',HomeController.find);
router.get('/khoang_cach',HomeController.khoang_cach);
router.post('/khoang_cach',HomeController.khoang_cach);
router.post('/find_trangtrai',HomeController.find_trangtrai);
function route(app){

        app.use('/',router);
        app.use('/index',router);
        app.use('/nongtrai',router);
        app.use('/find',router);
        app.use('/khoang_cach',router);
        app.use('/find_trangtrai',router);
}
module.exports =route;
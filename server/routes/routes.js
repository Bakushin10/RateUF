//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.render('index')
});

//insert prof review from ProfessorForm.jsx
router.route('/insertNewProfessorReview').post(function(req,res){

    const name = req.body.name;
    const major = req.body.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfReviewModel')
    var newReview = {
        overallExpe : req.body.overallExpe,
        levelOfDiffculty : req.body.levelOfDiffculty,
        communicationOfIdeas : req.body.communicationOfIdeas,
        facilitationOfLearning : req.body.facilitationOfLearning,
        howIsTheProfessor : req.body.howIsTheProfessor, 
        wouldTakeAgain : req.body.wouldTakeAgain,
        extraComment : req.body.extraComment,
        courseTakenFor : req.body.courseTakenFor
    }

    console.log(name)
    console.log(newReview);
 
    DB_name.findOneAndUpdate({'name':name},{$push:{review:newReview}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("Successfully created new review!\n ");
            }
        });
})


router.route('/updateProfessorComment').post(function(req,res){
    const _id = req.body.id;
    const name = req.body.name;
    const comment = req.body.comment;
    const major = req.body.major;
    
    console.log(_id)
    console.log(name)
    console.log(comment)
    console.log(major)
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfReviewModel');

    DB_name.findOneAndUpdate({'review._id':_id}, {$push:{comment:comment}},{upsert:true},
    function(err,req){
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log("Successfully created new review!\n ");
        }
    });
})

//insert prof review from ProfessorForm.jsx
router.route('/insertNewCourseReview').post(function(req,res){

    const courseCode = req.body.courseCode;
    const major = req.body.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseReviewModel')
    var newReview = {
        overallExpe : req.body.overallExpe,
        levelOfDiffculty : req.body.levelOfDiffculty,
        knowBeforeCourse : req.body.knowBeforeCourse,
        howIsTheClass : req.body.howIsTheClass,
        extraComment : req.body.extraComment,
        whoTookWith : req.body.whoTookWith
    }

    console.log(courseCode)
    console.log(newReview);
 
    DB_name.findOneAndUpdate({'courseCode':courseCode},{$push:{review:newReview}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("Successfully created new review!\n ");
            }
        });
})

/*
 retrieve array of all prof by selected major 
*/
router.get('/getAllProfByMajor',function(req, res) {
    const major = req.query.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfModel')

    DB_name.find({},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 get a single prof slected by ID
*/
router.get('/getProfDetails',function(req, res) {
    const major = req.query.major;
    const name = req.query.name;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfModel')

    DB_name.findOne({name : name},function(err,professor){
        if(err)
            res.send(err);

        res.json(professor);
    })
});

/*
 get review of the prof
*/
router.get('/getProfReviews',function(req, res) {
    const major = req.query.major;
    const name = req.query.name;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfReviewModel')

    DB_name.findOne({name : name},function(err,professor){
        if(err)
            res.send(err);
        console.log(professor)
        res.json(professor);
    })
});

/*
 retrieve array of all classes by selected major 
*/
router.get('/getAllCoursesByMajor',function(req, res) {
    const major = req.query.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseModel')

    DB_name.find({},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 get a single course slected by courseName
*/
router.get('/getCourseDetails',function(req, res) {
    const major = req.query.major;
    const courseCode = req.query.courseCode;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseModel')

    DB_name.findOne({courseCode : courseCode},function(err,professor){
        if(err)
            res.send(err);

        res.json(professor);
    })
});

/*
 get review of the course
*/
router.get('/getCourseReviews',function(req, res) {
    const major = req.query.major;
    const courseCode = req.query.courseCode;
    console.log("getProfDetails server side");
    console.log(req.query)
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseReviewModel')

    DB_name.findOne({courseCode : courseCode},function(err,professor){
        if(err)
            res.send(err);
        console.log(professor)
        res.json(professor);
    })
});

router.get('/updateOverAllExpeForAProf',function(req, res) {
    const major = req.query.major;
    const name = req.query.name;
    const overallExpe = req.query.overAllExpe;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfModel')

    DB_name.findOneAndUpdate({name : name},{overview : overallExpe},function(err,professor){
        if(err)
            res.send(err);

        res.json(professor);
    })
});

router.get('/updateOverAllExpeForACourse',function(req, res) {
    const major = req.query.major;
    const courseCode = req.query.courseCode;
    const overallExpe = req.query.overAllExpe;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseModel')

    DB_name.findOneAndUpdate({courseCode : courseCode},{overview : overallExpe},function(err,professor){
        if(err)
            res.send(err);

        res.json(professor);
    })
});

module.exports = router;
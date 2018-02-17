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
    const DB_name = require('../../models/'+major+'ProfReviewModel')
    var newReview = {
        overallExpe : req.body.overallExpe,
        levelOfDiffculty : req.body.levelOfDiffculty,
        communicationOfIdeas : req.body.communicationOfIdeas,
        facilitationOfLearning : req.body.facilitationOfLearning,
        wouldTakeAgain : req.body.wouldTakeAgain,
        extraComment : req.body.extraComment
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

/*
 retrieve array of all prof by selected major 
*/
router.get('/getAllProfByMajor',function(req, res) {
    const major = req.query.major;
    const DB_name = require('../../models/'+major+'ProfModel')

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
    const _id = req.query._id;
    const DB_name = require('../../models/'+major+'ProfModel')

    DB_name.findOne({_id : _id},function(err,professor){
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
    const DB_name = require('../../models/'+major+'ProfReviewModel')

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
    const DB_name = require('../../models/'+major+'CourseModel')

    DB_name.find({},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 get a single course slected by ID
*/
router.get('/getCourseDetails',function(req, res) {
    const major = req.query.major;
    const courseCode = req.query.courseCode;
    console.log("getProfDetails server side");
    console.log(courseCode)
    
    const DB_name = require('../../models/'+major+'CourseModel')

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
    const name = req.query.name;
    console.log("getProfDetails server side");
    console.log(req.query)
    const DB_name = require('../../models/'+major+'CourseReviewModel')

    DB_name.findOne({name : name},function(err,professor){
        if(err)
            res.send(err);
        console.log(professor)
        res.json(professor);
    })
});

module.exports = router;
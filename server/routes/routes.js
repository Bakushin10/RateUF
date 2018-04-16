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
        courseTakenFor : req.body.courseTakenFor,
        tipsForSuccess : req.body.tipsForSuccess,
        thumbsUp: 0,
        thumbsDown:0
    }
 
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
    const name = req.body.name;
    const major = req.body.major;
    const comment = {
        comment  : req.body.comment,
        reviewID :  req.body.id
    }

    const DB_name = require('../../models/'+major+'Model/'+major+'ProfComment');

    DB_name.findOneAndUpdate({'name':name}, {$push:{comment:comment}},{upsert:true},
    function(err,req){
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log("Successfully upload new comment for a prof!\n ");
        }
    });
})

router.route('/updateCourseComment').post(function(req,res){
    const coursename = req.body.name;
    const major = req.body.major;
    const comment = {
        comment  : req.body.comment,
        reviewID :  req.body.id
    }

    const DB_name = require('../../models/'+major+'Model/'+major+'CourseComment');

    DB_name.findOneAndUpdate({'coursename':coursename}, {$push:{comment:comment}},{upsert:true},
    function(err,req){
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log("Successfully update new comment for a course!\n ");
        }
    });
})


router.route('/updateProfessorComment').post(function(req,res){
    const name = req.body.name;
    const major = req.body.major;
    const comment = {
        comment  : req.body.comment,
        reviewID :  req.body.id
    }

    const DB_name = require('../../models/'+major+'Model/'+major+'ProfComment');

    DB_name.findOneAndUpdate({'name':name}, {$push:{comment:comment}},{upsert:true},
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
        whoTookWith : req.body.whoTookWith,
        thumbsUp: 0,
        thumbsDown:0
    }
 
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

//update previous info 
router.route('/updatePreviousHistory').post(function(req,res){

    const major = req.body.major;
    const name = req.body.name;
    const courseName = req.body.courseName;
    const courseCode = req.body.courseCode;
    const previousProfModel = require('../../models/'+major+'Model/'+major+'CoursePreviousProfModel')
    const previousCourseModel = require('../../models/'+major+'Model/'+major+'ProfPreviousCourseModel')

    var previousProf = {
        name : name
    }
    var prevousCourse = {
        courseName : courseName,
        courseCode : courseCode
    }
 
    //update previous Prof 
    previousProfModel.findOneAndUpdate({'courseCode':courseCode},{$push:{ProfPreviouslyTaught:previousProf}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("Successfully updated previous Prof!\n ");
            }
        });

    //update previous course
    previousCourseModel.findOneAndUpdate({'name':name},{$push:{coursePreviouslyTaught:prevousCourse}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("Successfully updated previous course!\n ");
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
 retrieve an array of all reviews by selected major
*/
router.get('/getAllProfReviews',function(req, res) {
    const major = req.query.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfReviewModel')

    DB_name.find({},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 retrieve an array of all reviews by selected major
*/
router.get('/getAllCourseReviews',function(req, res) {
    const major = req.query.major;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseReviewModel')

    DB_name.find({},function(err,course){
        if(err)
            res.send(err);
        res.json(course);
    })
});

/*
 retrieve commnet by prof
*/
router.get('/getProfComment',function(req, res) {
    const major = req.query.major;
    const id = req.query.id;
    const name = req.query.name;
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfComment')
    
    DB_name.find({name : name},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 retrieve commnet by course
*/
router.get('/getCourseComment',function(req, res) {
    const major = req.query.major;
    const id = req.query.id;
    const coursename = req.query.name;
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseComment')

    DB_name.find({coursename : coursename},function(err,professor){
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
    const DB_name = require('../../models/'+major+'Model/'+major+'CourseReviewModel')

    DB_name.findOne({courseCode : courseCode},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 retrieve array of all prof by selected major 
*/
router.get('/getPreviousProf',function(req, res) {
    const major = req.query.major;
    const courseCode = req.query.courseCode
    const DB_name = require('../../models/'+major+'Model/'+major+'CoursePreviousProfModel')

    DB_name.findOne({courseCode : courseCode},function(err,professor){
        if(err)
            res.send(err);
        res.json(professor);
    })
});

/*
 retrieve array of all prof by selected major 
*/
router.get('/getPreviousCourse',function(req, res) {
    const major = req.query.major;
    const name = req.query.name
    const DB_name = require('../../models/'+major+'Model/'+major+'ProfPreviousCourseModel')

    DB_name.findOne({name : name},function(err,professor){
        if(err)
            res.send(err);
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

//API for updating thumbUp or thumdDown
router.get('/updateThumbs',function(req, res) {
    const id = req.query.id;
    const condition = req.query.condition;
    const major = req.query.major;
    var thumps = {
        thumbsUp : 0,
        thumbsDown : 0
    }
    let DB_name;
    
    if(req.query.isProf === "Prof"){
        console.log("Prof")
        DB_name = require('../../models/'+major+'Model/'+major+'ProfReviewModel')
    }
    else{
        console.log("Course")
        DB_name = require('../../models/'+major+'Model/'+major+'CourseReviewModel')
    }
    
    if(condition === "thumbsUp"){
        DB_name.findOneAndUpdate(
            {'review._id': id}, //find the element in array
            {$inc: {'review.$.thumbsUp': 1 }
            },function(err,professor){
            if(err)
                res.send(err);
        })
    }else{
        DB_name.findOneAndUpdate(
            {'review._id': id},
            {$inc: {'review.$.thumbsDown': 1}
            },function(err,professor){
            if(err)
                res.send(err);
        })
    }

    DB_name.findOne({'review._id': id},function(err, request){
        if(err)
            res.send(err);

        for(var i = 0; i < request.review.length; i++){
            if(request.review[i]._id == id){
                thumps.thumbsUp = request.review[i].thumbsUp;
                thumps.thumbsDown = request.review[i].thumbsDown;
            }
        }
        res.json(thumps);
    })
});


module.exports = router;
//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
var Professor = require('../../models/Prof');
var CS_Prof = require('../../models/CSProfModel');
var Math_Prof = require('../../models/MathProfModel');
var ECE_Prof = require('../../models/ECEProfModel');

router.get('/', function(req, res){
  res.render('index')
});

//insert prof review from ProfessorForm.jsx
router.route('/insertNewProfessorReview').post(function(req,res){

    var name = req.body.name;
    var major = req.body.major;
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
    if(major == "CS"){
        CS_Prof.findOneAndUpdate({'name':name},{$push:{review:newReview}},{upsert:true},
            function(err,req){
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    console.log("Successfully created chat updated!\n ");
                }
          });
    }

    if(major == "MATH"){
        Math_Prof.findOneAndUpdate({'name':name},{$push:{review:newReview}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);  
            } else {
                console.log("Successfully created chat updated!\n ");
            }
      });
    }

    if(major == "ECE"){
        ECE_Prof.findOneAndUpdate({'name':name},{$push:{review:newReview}},{upsert:true},
        function(err,req){
            if (err) {
                console.log(err);
                res.status(400).send(err);  
            } else {
                console.log("Successfully created chat updated!\n ");
            }
      });
    }

})

/*
 retrieve array of all prof by selected major 
*/
router.get('/getAllProfByMajor',function(req, res) {
    var majorRec = req.query.major;
 
    if(majorRec == "CS"){
        CS_Prof.find({},function(err,professor){
            if(err)
                res.send(err);
            res.json(professor);
        })
    }
    if(majorRec == "ECE"){
        ECE_Prof.find({},function(err,professor){
            if(err)
                res.send(err);
            res.json(professor);
        })
    }
    if(majorRec == "MATH"){
        Math_Prof.find({},function(err,professor){
            if(err)
                res.send(err);
            res.json(professor);
        })
    }

});

/*
 get a single prof slected by ID
*/
router.get('/getProfDetails',function(req, res) {
    var major = req.query.major;
    var _id = req.query._id;
    console.log("getProfDetails server side");

    if(major == "CS"){
        CS_Prof.findOne({_id : _id},function(err,professor){
            if(err)
                res.send(err);

            res.json(professor);
        })
    }
    if(major == "ECE"){
        ECE_Prof.findOne({_id : _id},function(err,professor){
            if(err)
                res.send(err);

            res.json(professor);
        })
    }
    if(major == "MATH"){
        Math_Prof.findOne({_id : _id},function(err,professor){
            if(err)
                res.send(err);

            res.json(professor);
        })
    }

});

router.get('/getAll',function(req, res) {
    var monthRec = req.query.month;
    var yearRec = req.query.year;
    if(monthRec && monthRec != 'All'){
        Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, expenses) {
        if (err)
            res.send(err);
        res.json(expenses);
    });
    } else {
        Expense.find({year: yearRec}, function(err, expenses) {
            if (err)
                res.send(err);
            res.json(expenses);
        });
    }
});

module.exports = router;
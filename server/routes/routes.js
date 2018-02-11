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

router.route('/insert').post(function(req,res) {
    console.log(req.body)
    var expense = new Expense();
    expense.profName = req.body.profName;
    expense.course = req.body.course;
    expense.major = req.body.major;
    expense.month = req.body.month;
    expense.year = req.body.year;
  
    expense.save(function(err) {
        if (err)
            res.send(err);
        res.send('Expense successfully added!');
    });
})

//insert prof review from ProfessorForm.jsx
router.route('/insertNewProfessorReview').post(function(req,res){
    console.log(req.body);

})

router.get('/getProfByMajor',function(req, res) {
    var majorRec = req.query.major;
 
    
    Professor.find({major: majorRec}, function(err, professor) {
        if (err)
            res.send(err);
        res.json(professor);
    });

});

router.get('/getProfDetails',function(req, res) {
    var _id = req.query._id;
    console.log("getProfDetails server side");
    console.log(_id);

    Professor.findOne({professor: {$elemMatch : {_id:_id}}}, function(err, professor) {
        if (err)
            res.send(err);
        res.json(professor);
    });
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
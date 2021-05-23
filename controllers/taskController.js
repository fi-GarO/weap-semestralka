const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../auth');
const Task = require('../models/task');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;


exports.decision = function(req, res, next) {
    res.render('decision.html')
};

exports.newTaskEditor = function(req, res, next) {
    res.render('additor.html')
};

exports.saveTask = function(req, res, next) {
   new Task ({
    _id: new mongoose.Types.ObjectId(),
    mainText: req.body.mainText,
    taskCompleted: req.body.taskCompleted
}).save(function(err, mTask) {
    if (err) {
        return next(err);
    } else {
        return res.redirect('/decision');
    }
});
};

exports.editTask = function(req, res, next) {
     let query = { "_id": req.params.id };
    Task.find(query, function(err, task) {
        res.render('editor.html', {
           tasks: task 
        });
    });
   
};

exports.saveChanges = function(req, res, next) {
    let query = { "_id": req.params.id };
    let update = {  
        mainText: req.body.mainText,
    }
    let options = { new: false };
    Task.findOneAndUpdate(query, update, options, function(err, mTask) {
        res.redirect('/123');
    });
};

exports.deleteTask = function(req, res, next) {
    let query = { "_id": req.params.id };
    Task.findOneAndRemove(query, function(err, mTask) {
        res.redirect('/123')

    });
};

exports.getTask = function(req,res,next){
    Task.find(function(err, task) {
        res.render('browseTasks.html', {
                tasks: task
            });
        });
    
};

/*exports.getID = function(req,res,next){
    getTask(request, res);
    Task.find({}, function(err, task) {
        for (var i = 0; i < task.length; i++) {
        task[i] = task[i]._id;
    }

     res.render('browseTasks.html', {
            id: task.slice(0),  
            text: taskx  
        });   
    });  

        
};*/



/*exports.getTask = function(req,res,next){
    Task.find({}, function(err, task) {
        for (var i = 0; i < task.length; i++) {
        task[i] = task[i].mainText;
        
    }
     res.render('browseTasks.html', {
            text: task.slice(0),
            id: task._id     
            
        });
     console.log(task._id)

        
    });  
        
};
*/

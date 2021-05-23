const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../auth');
const Task = require('../models/task');
const mongoose = require('mongoose');
const xss = require("xss");

router.get('/json', function(req, res, next) {
    Task.find(function(err, tasks) {
        if(err) res.send(err);
        res.json(tasks);
    });
});

router.get('/login', function(req, res, next) {
    res.render('loginform.html');
});

router.post('/login', function(req, res, next) {
    console.log("task_id")
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                let err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.render('decision.html');
            }});
    } else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
    
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// Tasks
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/decision', auth.requiresLogin, taskController.decision);
router.get('/123', auth.requiresLogin, taskController.getTask);

router.get('/add', auth.requiresLogin, taskController.newTaskEditor);
router.post('/add', auth.requiresLogin, taskController.saveTask);

router.get('/delete/:id', auth.requiresLogin, taskController.deleteTask);

router.get('/edit/:id', auth.requiresLogin, taskController.editTask);
router.post('/edit/:id', auth.requiresLogin, taskController.saveChanges);

module.exports = router;

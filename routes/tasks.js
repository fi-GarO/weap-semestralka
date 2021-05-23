const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../auth');
const Task = require('../models/task');
const mongoose = require('mongoose');
const xss = require("xss");


router.get('/add', auth.requiresLogin, taskController.newTaskEditor);
router.post('/add', auth.requiresLogin, taskController.saveTask);
router.get('/edit/:id', auth.requiresLogin, taskController.editTask);
router.get('/delete/:id', auth.requiresLogin, taskController.deleteTask);
router.post('/edit/:id', auth.requiresLogin, taskController.saveChanges);

module.exports = router;
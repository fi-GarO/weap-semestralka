const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mainText: {
        type: String,
        required: true
    },
    taskCompleted:  {
        type: Boolean
    },

});

let Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
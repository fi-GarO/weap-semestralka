const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            // bcrypt compare method
            bcrypt.compare(password, user.password, function (err, result) {
                console.log(password);
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

let User = mongoose.model('User', UserSchema);
module.exports = User;
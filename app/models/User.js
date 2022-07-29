const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
    email: { type: String, index: true, unique: true, required: true, },
    password: { type: String, required: true }
});

schema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(Number(process.env.SALT), function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
});

schema.plugin(uniqueValidator);
schema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATEKEY, { expiresIn: '1h' });
    return token;
}

module.exports = mongoose.model('User', schema);
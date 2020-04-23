'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Token = new Schema({
    username: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
        required: true,
        unique: true
    }
});

Token.statics.authenticate = function(username, password, callback) {
    this.findOne({ username }, async (error, user) => {
        if(error) {
            return callback(error);
        }
        if(!user) {
            return callback();
        }
        try {
            const correctPassword = await argon2.verify(user.password, password);
            if (correctPassword) {
                return callback(null, user);
            } else {
                return callback();
            }
        } catch (e) {
            return callback(e);
        }
    });
};

export default mongoose.model('Token', Token);

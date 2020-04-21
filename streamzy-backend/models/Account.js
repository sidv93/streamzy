'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import argon2 from 'argon2';

const Account = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

Account.statics.authenticate = async function(username, password) {
    try {
        const user = await this.findOne({username});
        if(!user) {
            return Promise.resolve();
        }
        const isPasswordRight = await argon2.verify(user.password, password);
        return Promise.resolve(isPasswordRight ? user : null);
    } catch (e) {
        console.log('error', e);
    }
};

Account.statics.register = async function(newUser) {
    try {
        const hashedPassword = await argon2.hash(newUser.password);
        newUser.password = hashedPassword;
        return newUser.save();
    } catch (e) {
        return Promise.reject(e);
    }
}

export default mongoose.model('Account', Account);

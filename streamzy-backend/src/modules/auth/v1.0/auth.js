import Account from '../../../../models/Account';
import Token from '../../../../models/Token';
import { v4 as uuid } from 'uuid';
import status from 'http-status';
import mailer from '../../../common/mailer';

const login = async (req, res) => {
    console.log('in login');
    let { username, password } = req.body;
    if(!username || !password ) {
        console.log('No username or password while logging in');
        res.status(status.BAD_REQUEST);

        return res.json({
            status: 'error',
            message: 'Requires username and password',
            data: {}
        });
    }
    username = String(username);
    password = String(password);

    try {
        const user = await Account.authenticate(username, password);
        if(!user) {
            console.log(`Authentication error while trying to log in with ${username}`);
            res.status(status.UNAUTHORIZED);

            return res.json({
                status: 'error',
                message: 'Authentication error',
                data: {username}
            });
        }
        console.log(`${username} authenticated`);
        const authToken = uuid();
        const newToken = new Token({authToken, username});
        await newToken.save();

        res.status(status.OK);
        return res.json({
            status: 'success',
            data: {authToken, username}
        });
    } catch(e) {
        console.log('Error during authentication', e);
        res.status(status.INTERNAL_SERVER_ERROR);

        return res.json({
            status: 'error',
            message: 'Internal server error',
            data: {}
        });
    }
}

const signup = async (req, res) => {
    console.log('signup');
    const { username, password, firstname, lastname, email } = req.body;
    const newUser = new Account({username, password, firstname, lastname, email});
    try {
        await Account.register(newUser);
        console.log('New user added successfully');
        console.log('sending mail');
        await sendRegistrationEmail({to: email, subject: 'Registration successfull'});
        res.status(status.OK);
        return res.json({
            status: 'success',
            data: {username}
        });
    } catch(e) {
        console.log('Error during signup', e);
        res.status(status.INTERNAL_SERVER_ERROR);

        return res.json({
            status: 'error',
            message: 'Internal server error',
            data: {}
        });
    }
}

const sendRegistrationEmail = async ({to, subject}) => {
    try {
        const emailBody = `Welcome to Streamzy`;
        await mailer.sendMail({from: 'Streamzy', to, subject, body: emailBody});
        return Promise.resolve();
    } catch (e) {
        console.log('error when sending mail');
        return Promise.reject(e);
    }
}

export default { login, signup };

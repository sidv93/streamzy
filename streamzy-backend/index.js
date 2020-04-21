import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import router from './src/routes';
import mongoose from 'mongoose';
import mailer from './src/common/mailer';

const app = express();

app.set('port', 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

(async () => {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@streamzy0-kn0ex.gcp.mongodb.net/streamzy?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('connected');
        await mailer.nodemailerInit();
    } catch(e) {
        console.log('Mongo error', e);
    }
})();

app.use(router);

const server = app.listen(app.get('port'), () => {
    console.log(`App is running in ${app.get('port')}`);
});

export default server;
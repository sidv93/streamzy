import nodemailer from 'nodemailer';

let transporter;

const nodemailerInit = async () => {
    let testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
}

const sendMail = async ({from, to, subject, body}) => {
  try {
      let info = await transporter.sendMail({
        from,
        to,
        subject,
        text: body,
      });
      return Promise.resolve();
  } catch(e) {
    console.log('error while sending mail', e);
    return Promise.reject(e);
  }
};

export default {
    nodemailerInit,
    sendMail
}
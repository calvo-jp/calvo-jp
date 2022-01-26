import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'calvojp92@gmail.com',
    pass: 'Oct121992*',
  },
});

export default mailer;

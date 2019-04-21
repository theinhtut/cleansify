const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const moment = require('moment');

// env variables
require('dotenv').config({ path: '.env.development' });

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

// * Routes Handlers
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// POST handlers for form submission
app.post('/api/form', (req, res) => {
  const reqBody = req.body;

  // Return 200 For Successful Submission
  res.status(200).json({
    message: 'Successful POST to /api/form'
  });

  // HTML Email Tempalates
  const htmlEmail = `
    <h1>Your Cleaning Request Has Been Confirmed</h1>
    <p>
      Thank you for choosing Cleansify App. Your Cleaning Request is accepted by <b>${reqBody.vendorName}</b> for <b>${moment(reqBody.date).format('Do MMMM YYYY')}</b> at <b>${reqBody.location}.</b>
    </p>
  `;

  // NodeMailer Setup
  const testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_MAIL_USERNAME,
      pass: process.env.GOOGLE_MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'environ.3dtech@gmail.com',
    to: reqBody.email,
    subject: 'You have successfully booked your cleaning service',
    html: htmlEmail
  };

  // Send Mail With Defined Transport Object
  const info = transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
});


// Setup Server Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

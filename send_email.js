const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { fname, lname, email, message } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: 'vcharm26@gmail.com',
    subject: `New Message from ${fname} ${lname}`,
    text: `Good day, Charm!\n\nYou received a message from ${fname} ${lname}. Here are the details:\n\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email successfully sent!',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Email sending failed: ${error.message}`,
    };
  }
};
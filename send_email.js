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
      body: `Email sending failed`,
    };
  }
};

$(document).ready(function() {
  $("#contactsOnly").submit(function(event) {
      event.preventDefault();
      $.ajax({
          url: '/.netlify/functions/send_email',
          type: 'POST',
          data: JSON.stringify($(this).serializeArray().reduce((obj, item) => {
              obj[item.name] = item.value;
              return obj;
          }, {})),
          contentType: 'application/json; charset=utf-8',
          success: function(response) {
              $('#formResponse').html(response);
          },
          error: function(xhr, status, error) {
              $('#formResponseError').html(`<p>Email sending failed`);
          }
      });
  });
});
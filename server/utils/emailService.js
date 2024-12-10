// // utils/emailService.js
// const nodemailer = require('nodemailer');

// // Create reusable email transporter using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',  // You can use other services as well
//   auth: {
//     user: process.env.EMAIL_USER,  // Your email
//     pass: process.env.EMAIL_PASS,  // Your email password or app password
//   },
// });
// console.log('Receiver Email:', receiverEmail);


// // const sendMatchEmail = (receiverEmail, donorName, receiverName, matchId) => {
// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: receiverEmail,  // Send email to the receiver's email
// //     subject: 'Match Found for You!',
// //     html: `
// //       <p>Dear ${receiverName},</p>
// //       <p>We are excited to inform you that a potential match has been found for you:</p>
// //       <p><strong>Donor: </strong>${donorName}</p>
// //       <p>Please review the details of the match and choose whether to accept or reject it.</p>
// //       <a href="http://yourwebsite.com/accept-match/${matchId}?status=accept">Accept Match</a>
// //       <br />
// //       <a href="http://yourwebsite.com/accept-match/${matchId}?status=reject">Reject Match</a>
// //     `,
// //   };



// const sendMatchEmail = (receiverEmail, donorName, receiverName, matchId) => {
//   if (!receiverEmail) {
//     console.error('Receiver email is not provided!');
//     return;
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: receiverEmail,  // Make sure receiverEmail is a valid value
//     subject: 'Match Found for You!',
//     html: `
//       <p>Dear ${receiverName},</p>
//       <p>We are excited to inform you that a potential match has been found for you:</p>
//       <p><strong>Donor: </strong>${donorName}</p>
//       <p>Please review the details of the match and choose whether to accept or reject it.</p>
//       <a href="http://yourwebsite.com/accept-match/${matchId}?status=accept">Accept Match</a>
//       <br />
//       <a href="http://yourwebsite.com/accept-match/${matchId}?status=reject">Reject Match</a>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };


// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       console.log('Error sending email:', error);
// //     } else {
// //       console.log('Email sent: ' + info.response);
// //     }
// //   });
// // };

// module.exports = { sendMatchEmail };























// const nodemailer = require('nodemailer');

// // Function to send the match email
// const sendMatchEmail = (receiverEmail, donorName, receiverName, matchId) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,  // Your email user
//       pass: process.env.EMAIL_PASS,  // Your email password or app password
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: receiverEmail,
//     subject: 'Match Found for You!',
//     html: `
//       <p>Dear ${receiverName},</p>
//       <p>We are excited to inform you that a potential match has been found for you:</p>
//       <p><strong>Donor: </strong>${donorName}</p>
//       <p>Please review the details of the match and choose whether to accept or reject it.</p>
//       <a href="http://yourwebsite.com/accept-match/${matchId}?status=accept">Accept Match</a>
//       <br />
//       <a href="http://yourwebsite.com/accept-match/${matchId}?status=reject">Reject Match</a>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// module.exports = sendMatchEmail;












const nodemailer = require('nodemailer');

const sendMatchEmail = (receiverEmail, donorName, receiverName, matchId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your email user
      pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiverEmail,
    subject: 'Match Found for You!',
    html: `
      <p>Dear ${receiverName},</p>
      <p>We are excited to inform you that a potential match has been found for you:</p>
      <p><strong>Donor: </strong>${donorName}</p>
      <p>Please review the details of the match and choose whether to accept or reject it.</p>
      <a href="http://yourwebsite.com/accept-match/${matchId}?status=accept">Accept Match</a>
      <br />
      <a href="http://yourwebsite.com/accept-match/${matchId}?status=reject">Reject Match</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
console.log({ sendMatchEmail });  // Log the imported object


// Export function
module.exports = { sendMatchEmail };

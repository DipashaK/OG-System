// const express = require('express');
// const Transplant = require('../Models/transplant');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { date, time, organ, recipient, location } = req.body;

//   if (!date || !time || !organ || !recipient || !location) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     const newTransplant = new Transplant({ date, time, organ, recipient, location });
//     await newTransplant.save();

//     res.json(newTransplant);
//     notifyAdmin(newTransplant);
//   } catch (error) {
//     console.error("Error saving transplant:", error);
//     res.status(500).json({ error: "Failed to save transplant." });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const transplants = await Transplant.find();
//     res.json(transplants);
//   } catch (error) {
//     console.error("Error fetching transplants:", error);
//     res.status(500).json({ error: "Failed to fetch transplants." });
//   }
// });

// const notifyAdmin = (transplant) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'dipashak0505@gmail.com',
//     subject: 'New Organ Transplant Scheduled',
//     text: `A new organ transplant has been scheduled:\n\nOrgan: ${transplant.organ}\nRecipient: ${transplant.recipient}\nTime: ${transplant.time}\nDate: ${transplant.date}\nLocation: ${transplant.location}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// module.exports = router;

const express = require("express");
const Transplant = require("../Models/transplant");
const router = express.Router();

router.post("/", async (req, res) => {
  const { date, time, organ, recipient, location, endDate } = req.body;

  if (!date || !time || !organ || !recipient || !location || !endDate) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (new Date(endDate) < new Date(date)) {
    return res.status(400).json({ error: "End date cannot be before start date." });
  }

  try {
    const newTransplant = new Transplant({ date, time, organ, recipient, location, endDate });
    await newTransplant.save();
    res.json(newTransplant);
  } catch (error) {
    console.error("Error saving transplant:", error);
    res.status(500).json({ error: "Failed to save transplant." });
  }
});

router.get("/", async (req, res) => {
  try {
    const transplants = await Transplant.find();
    res.json(transplants);
  } catch (error) {
    console.error("Error fetching transplants:", error);
    res.status(500).json({ error: "Failed to fetch transplants." });
  }
});

module.exports = router;

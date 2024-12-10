const express = require('express')
const user = require('../models/userModel')
// const mail = require('../helpers/mailService')
// const sms = require('../helpers/smsService')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const SECRET_KEY = 'g15-2022-batch-2024-bee-2026'


const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        console.log('inputData', req.body);

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ ...req.body, password: hashedPassword });
        await newUser.save();

        // Send welcome email
        // await mail.sendGreetMail(email);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error in user registration:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        console.log('inputData', req.body);

        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token, user: existingUser });
    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = {userRegister, userLogin}
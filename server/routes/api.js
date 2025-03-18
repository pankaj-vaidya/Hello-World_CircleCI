const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

// Use async/await for mongoose connection
const db = "mongodb://localhost:27017/eventsdb";
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error: ' + error);
    }
};

connectDB();

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', async (req, res) => {
    let userData = req.body;  
    let user = new User(userData);
    try {
        const registeredUser = await user.save();
        
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, 'secretKey');  
        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while registering user.');
    }
});

router.post('/login', async (req, res) => {
    let userData = req.body;

    try {

        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return res.status(401).send('Invalid email');
        }

        if (user.password !== userData.password) {
            return res.status(401).send('Invalid password');
        }


        let payload = { subject: user._id };
        let token = jwt.sign(payload, 'secretKey'); 
        res.status(200).send({ token });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error while logging in');
    }
});
router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Abc",
            "description": "events",
            "date": "2012-04023T18:25:43.511Z"
        },
    ]
    res.json(events)
});
router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Abc",
            "description": "special",
            "date": "2012-04023T18:25:43.511Z"
        },
    ]
    res.json(events)
})
module.exports = router;

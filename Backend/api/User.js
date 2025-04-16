const express = require('express');
const router = express.Router();

//Signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Add your signup logic here
    res.status(201).json({ message: 'User signed up successfully' });
});

//Signin
router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    // Add your signin logic here
    res.status(200).json({ message: 'User signed in successfully' });
});

module.exports = router;
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');


//register
router.post('/register', async (req, res) => {
    
    //Lets Validate the Data before we create a User
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists.');
    
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //Lets Validate the Data before we create a User
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Checking if the user is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exists.");
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is Invalid.');

    //Create and assign a token
    //set any secret token like: 'asdkfjaklsdjfkashdfkjh'
    const token = jwt.sign({ _id: user._id }, (process.env.TOKEN_SECRET || 'asdkfjaklsdjfkashdfkjh'));
    res.header('auth-token', token).json({
        message: 'Login Successful! :)',
        token: token,
    });

    
});

module.exports = router;
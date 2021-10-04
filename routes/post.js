const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

//Post the data if already login
router.get('/', verify, async (req, res) => {
    res.json({
        posts:
        {
            title: 'My first post',
            description: 'random data you should not access.'
        }
    });
});

//Get the Current userinfo
router.get('/userinfo', verify, async (req, res) => {
    const userInfo = await User.findById({
        _id: req.user._id
    });
    res.send({ id: userInfo._id, name: userInfo.name, email: userInfo.email });
});

module.exports = router;
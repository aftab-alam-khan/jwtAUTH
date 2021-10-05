const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

const posts = [
    {
        id: "615c701ef3f62ff8f4303211",
        title: 'My first post',
        description: "Id: 615c701ef3f62ff8f4303211, login posts"
    },
    {
        id: "615c704cf3f62ff8f4303216",
        title: 'My first post',
        description: "Id: 615c704cf3f62ff8f4303216, login posts"
    }
];

//Post the data if already login
router.get('/', verify, async (req, res) => {
    const userPost = posts.filter(post => post.id === req.user._id)
    const post = (userPost.length !== 0)
        ? userPost
        : {
            userId: req.user._id,
            message: 'No post found for this userId'
        };
    res.json(post);
});

//Get the Current userinfo
router.get('/userinfo', verify, async (req, res) => {
    const userInfo = await User.findById({
        _id: req.user._id
    });
    res.send({ id: userInfo._id, name: userInfo.name, email: userInfo.email });
});

module.exports = router;
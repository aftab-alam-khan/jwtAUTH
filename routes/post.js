const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Post = require('../model/Post');

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

    const userInfo = await User.findById({
        _id: req.user._id
    });
    const userPost = await Post.find({email: userInfo.email}).select({ _id: 0, title: 1, message: 1 });
    // res.send(userPost);
    const post = (userPost.length !== 0)
        ? userPost
        : {
            email: userInfo.email,
            message: 'No post found for this userId'
        };
    res.json(post);
});

router.post('/create', verify, async (req, res) => {
    // Create a new User
    const userInfo = await User.findById({
        _id: req.user._id
    });

    const post = new Post({
        email: userInfo.email,
        title: req.body.title,
        message: req.body.message
    });
    try {
        await post.save();
        res.send(post);
    } catch (err) {
        res.status(403).send(err);
    }
});

//Get the Current userinfo
router.get('/userinfo', verify, async (req, res) => {
    const userInfo = await User.findById({
        _id: req.user._id
    });
    res.send({ id: userInfo._id, name: userInfo.name, email: userInfo.email });
});

module.exports = router;
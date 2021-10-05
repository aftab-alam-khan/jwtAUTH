const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

const posts = [
    {
        id: "615c608f6030c88e76c98f9e",
        title: 'My first post',
        description: "Id: 615c608f6030c88e76c98f9e, login posts"
    },
    {
        id: "615c66627f203e76f595a4ad",
        title: 'My first post',
        description: "Id: 615c66627f203e76f595a4ad, login posts"
    }
];

//Post the data if already login
router.get('/', verify, async (req, res) => {
    return res.json(posts.filter(post => post.id === req.user._id))
});

//Get the Current userinfo
router.get('/userinfo', verify, async (req, res) => {
    const userInfo = await User.findById({
        _id: req.user._id
    });
    res.send({ id: userInfo._id, name: userInfo.name, email: userInfo.email });
});

module.exports = router;
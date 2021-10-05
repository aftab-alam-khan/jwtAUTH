const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    // const token = req.header('accessToken');
    if (!token) return res.status(401).json({
        error: {
            message: 'Access Denied'
        }
    });

    try {

        //set any secret token like: 'asdkfjaklsdjfkashdfkjh'
        //SECREET KEY GENERATED USING NODEJS "require('crypto').randomBytes(64).toString('hex')"
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({
            error: {
                message: 'Invalid Token.'
            }
        });
    }
};
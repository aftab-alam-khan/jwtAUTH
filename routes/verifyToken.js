const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({
        error: {
            message: 'Access Denied'
        }
    });

    try {

        //set any secret token like: 'asdkfjaklsdjfkashdfkjh'
        const verified = jwt.verify(token, (process.env.TOKEN_SECRET || 'asdkfjaklsdjfkashdfkjh'));
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            error: {
                message: 'Invalid Token.'
            }
        });
    }
};
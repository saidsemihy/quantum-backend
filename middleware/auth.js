//jwt
const jwt = require('jsonwebtoken');
//const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send('Yetkiniz yok');
    }
    try {
        const decodedToken = jwt.verify(token, "jwtPrivateKey");
        req.user = decodedToken;
        next();
    } catch (ex) {
        res.status(400).send('Geçersiz token başka gir');
    }
}
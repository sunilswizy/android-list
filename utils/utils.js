const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res , next){
    const token = req.headers['authorization']
    if(token) {
        req.token = token;
        next();
    }
    else {
        res.json({
            message: "authentication failed",
            status: 403
        })
    }
}

function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_KEY, (err, _data) => {
            if(err) reject(false);
            else resolve(true);
        }) 
    })
}

module.exports = {
    verifyToken,
    validateToken
}
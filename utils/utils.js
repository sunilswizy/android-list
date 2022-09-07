const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res , next){
    try {
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
  catch(e) {
    res.json({
        message: "authentication failed",
        status: 403
    })
  }
}

function validateToken(token) {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.TOKEN_KEY, (err, _data) => {
                if(err) reject(false);
                else resolve(true);
            }) 
        }
        catch(e) {
            reject(false)
        }
       
    })
}

module.exports = {
    verifyToken,
    validateToken
}
const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors')
const Utils = require('./utils/utils')

const app = express()
const PORT = process.env.TOKEN_SERVER_PORT;
const key = process.env.TOKEN_KEY

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
}));


app.get('/home', (_req, res) => {
    res.send({title: "Android Play"})
})

app.post('/addProducts', Utils.verifyToken,  (req, res) => {
    try {
        Utils.validateToken(req.token).then(valid => {
            if(valid) {
                console.log("paylaod", req.body)
                res.json({
                    message: "product added succesfully",
                    success: true
                })
            }
            else {
                res.json({
                    message: "Authorization failed",
                    status: 403,
                    success: false
                })
            }
        }) 
        }
    catch(e) {
        res.json({
            message: "Authorization failed",
            status: 403,
            success: false
        });
    }
})

//login

app.post('/api/login', (req, res) => {
    try {
        const { userName } = req.body;
        jwt.sign({user: userName}, key, {expiresIn: '12 hours'}, (err, token) => {
            if(err) res.sendStatus(403);
    
            res.json({
                message: "token created",
                token
            })
        })
    }
    catch(e){
        res.sendStatus(403).send("Error occured ", e)
    }
})

app.post('/api/verify', async (req, res) => {
    try {
        const token = req.headers['authorization']
        const data = await Utils.validateToken(token)
        res.send(data)
    }
    catch(e) {
        res.send(false)
    }
})


app.listen(PORT, () => console.log("server is drop on", PORT));


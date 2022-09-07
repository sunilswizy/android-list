const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors')
const Utils = require('./utils/utils')
const sequelize = require('./database/connection')
const User = require('./database/models/User')
const Product = require('./database/models/Products')

const app = express()
const PORT = process.env.TOKEN_SERVER_PORT;
const key = process.env.TOKEN_KEY

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
}));

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


app.get('/home', (_req, res) => {
    res.send({ title: "Android Play" })
})

app.route('/products')
    .post(Utils.verifyToken, (req, res) => {
        try {
            Utils.validateToken(req.token).then(valid => {
                if (valid) {
                    Product.create(req.body).then(() => {
                        res.json({
                            message: "product added succesfully",
                            success: true
                        });
                    })
                }
                else {
                    res.json({
                        message: "Authorization failed",
                        status: 403,
                        success: false
                    })
                }
            }).catch(_e => {
                res.json({
                    message: "Authorization failed",
                    status: 403,
                    success: false
                })
            })
        }
        catch (e) {
            res.json({
                message: "Authorization failed",
                status: 403,
                success: false
            });
        }
    })
    .get(Utils.verifyToken, (req, res) => {
        try {
            Utils.validateToken(req.token).then(valid => {
                if (valid) {
                    Product.findAll({
                        attributes: ['productName', 'price', 'category',
                            'date', 'description', 'comment']
                    }).then(data => {
                        data = JSON.parse(JSON.stringify(data))
                        res.json({
                            message: "product listed",
                            status: 200,
                            data
                        });
                    }).catch(_e => {
                        res.json({
                            message: "Something went wrong",
                            status: 403,
                            data: []
                        });
                    })
                }
            })
        }
        catch (e) {
            res.json({
                message: "Authorization failed",
                status: 403,
                data: []
            });
        }
    })

//login

app.post('/api/login', (req, res) => {
    try {
        const { userName } = req.body;
        jwt.sign({ user: userName }, key, { expiresIn: '12 hours' }, (err, token) => {
            if (err) res.sendStatus(403);

            User.create({
                userName
            }).then((response) => {
                const data = JSON.parse(JSON.stringify(response))
                res.json({
                    message: "token created",
                    token,
                    data
                })
            }).catch(_e => {
                res.sendStatus(403).send("Error occured ", e)
            })
        })
    }
    catch (e) {
        res.sendStatus(403).send("Error occured ", e)
    }
})

app.post('/api/verify', async (req, res) => {
    try {
        const token = req.headers['authorization']
        const data = await Utils.validateToken(token)
        res.send(data)
    }
    catch (e) {
        res.send(false)
    }
})


app.listen(PORT, () => console.log("server is drop on", PORT));


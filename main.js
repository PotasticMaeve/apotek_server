const express = require('express');
const bp = require('body-parser');
const morgan = require('morgan');
const user = require('./models').User;


const app = express();
require('dotenv').config();
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
app.use(morgan('tiny'))

app.get('/users', async (req, res)=>{
    const users = await user.findAll({});
    res.send({
        "msg":"memberlist",
        "data" : users
    })
})

app.post('/users', async (req, res)=>{
    name = req.body.name
    email = req.body.email
    passwd = req.body.password
    const newuser = await user.create({name:name, email:email,password:passwd,userlevel:1});
    res.send({
        'msg': `user ${name} added into members`,
        'data': newuser
    })
})

app.listen(process.env.PORT, () => console.log(`server activated! listening on port ${process.env.PORT}`));
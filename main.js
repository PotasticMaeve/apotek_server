// LIBRARIES
const express = require('express');
const bp = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

// MODEL
const user = require('./models').User;
const supplier = require('./models').Supplier;
const obat = require('./models').Obat;

// INSTANCES
const app = express();

// MIDDLEWARE
app.use(bp.json())                          // REQUEST HANDLERS
app.use(bp.urlencoded({extended: true}))    // REQUEST HANDLERS
app.use(morgan('tiny'))                     // LOGGER HANDLERS

app.get('/', (req,res) => {
    res.send({ "msg": "APOTEK API SERVER"})
})

app.get('/users', async (req, res) => {
    const users = await user.findAll({});
    res.send({
        "msg": "userlist",
        "data": users
    })
})

app.post('/users', async (req, res) => {
    name = req.body.name
    email = req.body.email
    passwd = req.body.password
    userlevel = 1
    const newuser = await user.create({
        name        :name,
        email       :email,
        password    :passwd,
        userlevel   :userlevel
    })
    res.send({
        "msg": `user ${name} added into db`,
        "data": newuser
    })
})

app.put('/users', async (req,res) => {
    id = req.body.id
    name = req.body.name
    email = req.body.email
    passwd = req.body.password
    userlevel = req.body.userlevel
    const usernow = await user.update({
        name: name,
        email: email,
        password: passwd,
        userlevel: userlevel
    },{where:{id:id}})
    res.send({
        "msg": `user ${name} updated`
    })
})

app.delete('/users', async (req,res) => {
    name = req.body.name
    let usernow = await user.destroy({where:{name:name}});
    res.send({
        "msg": `user ${name} deleted`,
    })
})

app.get('/suppliers', async (req,res) => {
    const suppliers = await supplier.findAll({});
    res.send({
        "msg" : "supplierlist",
        "data": suppliers

    })
})

app.post('/suppliers', async (req,res) => {
    name = req.body.name,
    email = req.body.email,
    address = req.body.address,
    telp = req.body.telp
    const newsupplier = await supplier.create({
        name    :name,
        email   :email,
        address :address,
        telp    :telp
    })
    res.send({
        "msg": `supplier ${name} added into db`,
        "data": newsupplier
    })
})

app.get('/obat', async (req,res) => {
    const obat = await supplier.findAll({});
    res.send({
        "msg" : "supplierlist",
        "data": obat

    })
})

app.post('/obat', async (req,res) => {
    name = req.body.name,
    type = req.body.type,
    price = req.body.price,
    qty = req.body.qty,
    id_supplier = req.body.id_supplier
    const newobat = await supplier.create({
        name    :name,
        type   :type,
        price :price,
        qty    :qty,
        id_supplier: id_supplier
    })
    res.send({
        "msg": `obat ${name} added into db`,
        "data": newobat
    })
})

app.listen(process.env.PORT, () => console.log(`server activated! listening on port ${process.env.PORT}`));
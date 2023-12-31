const express = require('express'); 
var router = express.Router();
const AccountModel = require('../models/account')

// lay du lieu DB
router.get('/', (req, res, next)=>{
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.get('/:id', (req, res, next)=>{
    var id = req.params.id
    AccountModel.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

// them moi du lieu DB
router.post('/', (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.create({
        username: username,
        password: password
    })
    .then(data=>{
        res.json('them accont thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

//update du lieu DB
router.put('/:id', (req, res, next)=>{
    var id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(id,{
        password: newPassword
    })
    .then(data=>{
        res.json('update thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

//xoa du lieu DB
router.delete('/:id', (req, res, next)=>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

module.exports = router
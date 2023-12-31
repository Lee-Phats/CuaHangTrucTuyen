const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const { body, validationResult } = require('express-validator'); 

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const AccountModel = require('./models/account');

app.post('/register', [
    body('username').notEmpty().withMessage('Chưa nhập tên người dùng'),
    body('password').notEmpty().withMessage('Chưa nhập mật khẩu')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        const existingUser = await AccountModel.findOne({ username });

        if (existingUser) {
            return res.json('Người dùng này đã tồn tại');
        }

        const newUser = await AccountModel.create({
            username,
            password
        });

        res.json('Tạo tài khoản thành công');
    } catch (error) {
        console.error(error);
        res.status(500).json('Lỗi không xác định');
    }
});

app.post('/login', [
    body('username').notEmpty().withMessage('Chưa nhập tên người dùng'),
    body('password').notEmpty().withMessage('Chưa nhập mật khẩu')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        const user = await AccountModel.findOne({ username, password });

        if (user) {
            res.json('Đăng nhập thành công');
        } else {
            res.status(300).json('Tài khoản không đúng');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Lỗi không xác định');
    }
});

app.listen(3000, () => {
    console.log('3000');
});

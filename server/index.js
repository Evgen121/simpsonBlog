const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const fs = require("fs");
const Post = require("./models/Post.js");


const app = express();

const secret = 'test';

const salt = bcrypt.genSaltSync(10);

const uploadMiddleware = multer({ dest: 'uploads/' })



app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
mongoose.set('strictQuery', true);




const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.mgt5hwu.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connect to MongoDB')
    } catch (error) {
        throw error
    }
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userDoc = User.create({
        username,
        password: bcrypt.hashSync(password, salt)
    })
    res.json(userDoc);
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username })
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        })
    } else {
        res.status(400).json('Password wrong')
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (error, info) => {
        if (error) throw error;
        res.json(info)
    })

})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (error, info) => {
        if (error) throw error;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        })
        res.json({ postDoc });
    })

})


app.get('/post', async (req, res) => {
    res.json(await Post.find()
        .populate("author", ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    )
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)

})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }


    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (error, info) => {
        if (error) throw error;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })

        res.json(postDoc)
    })
})

app.listen(5000, () => {
    connect()
    console.log("Backend start work")
})


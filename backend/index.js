const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
const PORT = 3000;
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postsRoute = require('./routes/postsRoute')
const commentsRoute = require('./routes/commentsRoute')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')


app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

mongoose
    .connect("mongodb://127.0.0.1:27017/plogs")
    .then(() => console.log("connected to db"))
    .catch((e) => console.log(e));

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postsRoute)
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use('/api/comment', commentsRoute)

app.get('/', (req, res) => {
    res.status(200).json("hello")
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, 'images')
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("img uploaded")
})

app.listen(PORT, () => console.log("server started"));

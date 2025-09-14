const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');

// Deploy web fullstack
const path = require('path');
// 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}
dotenv.config();

app.use('/', userRouter);
app.use('/contact', contactRouter);

// Deploy web fullstack
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/vite-project/dist")));
    app.get((req, res) => {
        res.sendFile(path.join(__dirname, "../client/vite-project/dist/index.html"));
    })
}
// 

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log("Connected to MongoDB");
    })
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listen at port ${PORT}`);
})
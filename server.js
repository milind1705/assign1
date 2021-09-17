require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();

// import files
const userRoute = require('./routes/userRoute')
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//database initaialization
mongoose.connect("mongodb://localhost:27017/authAssign");
mongoose.connection.once('open', () => {
    console.log('connected to db')
});

app.set('view engine', 'ejs');

//router
app.get('/', (req, res) => {
    res.render('home')
});

app.use('/user', userRoute)

//listning
app.listen(port, () => {
    console.log(`server is listning on port ${port}`)
})
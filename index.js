const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');



const app = express();

mongoose.connect('mongodb://localhost:27017/blogify').then(()=>console.log('Connected to database')).catch((err)=>console.log(err)); 
const PORT = 3000;



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set("views", path.resolve("./views"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})
app.use("/user", userRoutes ,()=>console.log('User routes are loaded'));

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)
)
const express = require('express');
 const dotevn=require('dotenv').config();
const path = require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog');
const port = process.env.PORT || 3000; 



const app = express();

mongoose.connect('mongodb://localhost:27017/blogify').then(()=>console.log('Connected to database')).catch((err)=>console.log(err)); 



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.set("views", path.resolve("./views"));
app.set('view engine', 'ejs');

app.get('/',async (req, res) => {
const allBlogs =  await Blog.find({})
    res.render('home', { user: req.user , blogs: allBlogs});
})

app.use("/user", userRoutes);
app.use("/blog", blogRoutes)
app.listen(port,()=>console.log(`Server is running on port ${port}`)
)
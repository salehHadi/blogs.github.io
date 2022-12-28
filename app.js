const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');



const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/note-tut')
    .then((result) => {
        app.listen(3000, ()=> {console.log('server is active on localhost at 3000')})
        console.log(`connecting to db`)
    })
    .catch((error) => {console.log(error)})


app.set('view engine', 'ejs');

// Middleware & Static file.
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/about', (req, res) => {
    res.status(200).render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
    res.status(301).redirect('/about');
});

// Blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
          res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((error) => {
            console.log(error)
        })
})
app.get('/blog/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})
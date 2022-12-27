const express = require('express');

const app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    const blogs = [
        {title: 'hello', snippet: 'hekfsdhfueb jdfuekjd dfheucbdks lasbcdeufbdksa'},
        {title: 'welcome', snippet: 'hekfsdhfueb jdfuekjd dfheucbdks lasbcdeufbdksa'},
        {title: 'welcome', snippet: 'hekfsdhfueb jdfuekjd dfheucbdks lasbcdeufbdksa'}
    ];

    res.render('index', {title: 'Home', blogs});
});
app.get('/about', (req, res) => {
    res.status(200).render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
    res.status(301).redirect('/about');
});

app.get('/blog/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

app.listen(4000, ()=> {console.log('server is active on localhost at 4000')})
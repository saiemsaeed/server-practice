const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} - ${req.path} \n`;
    fs.appendFileSync("server.log", log);
    next();
});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to My Website!"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: "Saiem's Page",
        text: "I am Saiem Saeed, Son of Muhammad Saeed and Shakeela Saeed!"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening to port ${port}!`);
})
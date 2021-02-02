const express = require('express');
const app     = express();
const path    = require('path');
const hbs     = require('hbs');
const port    = process.env.PORT || 8000;

//Static Path  

const staticPath   = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs'); 
app.set('views', templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);

//Routing

app.get("", (req,res) => {
    res.render('index');
});

app.get("/about", (req,res) => {
    res.render('about');
});

app.get("/weather", (req,res) => {
    res.render('weather');
});

app.get("*", (req,res) => {
    res.render('404error', {
        errormsg : "Oops! page not found"
    });
});

app.listen(port, () => {
    console.log(`listning the port ${port}`);
});
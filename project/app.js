const express = require('express');
const app = express();
const path=require('path');
const hbs=require('hbs');

const editProfileRoute=require('./routes/profile-editor.js');
const displayProfileRoute=require('./routes/display-profile-page.js')
const entryRoute=require('./routes/entry.js');

app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'))

hbs.registerPartials(path.join(__dirname,'/partials'))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

app.use(editProfileRoute)
app.use(displayProfileRoute)
app.use(entryRoute);

app.get('/', (req, res) => {
    res.render('index')
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


//database connection setup

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '35.225.233.113', //localhost, appspot, 
    database : 'docClient',
    user     : 'user',
    password : 'user@123456',
  // port : '8080',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM patient', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

connection.end();
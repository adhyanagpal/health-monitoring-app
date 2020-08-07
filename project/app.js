const express = require('express');
const app = express();
const path=require('path');
const hbs=require('hbs');
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "35.225.233.113",
//   database : 'docClient',
//   user: "user",
//   password: "user@123456",
//   port: 3306
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });



const editProfileRoute=require('./routes/profile-editor.js');
const displayProfileRoute=require('./routes/display-profile-page.js')
const entryRoute=require('./routes/entry.js');
const displayReportsRoute=require('./routes/display-reports.js');
const bookAppointmentsRoute=require('./routes/book-appointments.js');
const viewCalendarRoute=require('./routes/view-calendar.js');


app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'))

hbs.registerPartials(path.join(__dirname,'/partials'))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

app.use(displayReportsRoute);
app.use(bookAppointmentsRoute);
app.use(viewCalendarRoute);
app.use(editProfileRoute);
app.use(displayProfileRoute);
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

const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({
  projectId: 'summer20-sps-84',
  keyFilename: 'key.json'
});

//const key = datastore.key(['patient', datastore.int('5632499082330112')]);

// datastore.get(key, (err, entity) => {
// console.log(entity.name);
// });




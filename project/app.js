const express = require('express');
const app = express();
const path=require('path');
const hbs=require('hbs');
const Datastore = require('@google-cloud/datastore');

const editProfileRoute=require('./routes/profile-editor.js');
const saveProfileRoute=require('./routes/save-profile.js');
const displayProfileRoute=require('./routes/display-profile-page.js')
const entryRoute=require('./routes/entry.js');
const displayReportsRoute=require('./routes/display-reports.js');
const bookAppointmentsRoute=require('./routes/book-appointments.js');
const viewCalendarRoute=require('./routes/view-calendar.js');

// app.use('/edit-profile',(req,res)=>{
//     console.log(req)
//     res.render('profile-editor')
// });

app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'))

hbs.registerPartials(path.join(__dirname,'/partials'))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

app.use(displayReportsRoute);
app.use(saveProfileRoute);
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






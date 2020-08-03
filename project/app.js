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

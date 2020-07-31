const express = require('express');
const app = express();
const path=require('path')
const editProfileRoute=require('./profile-editor.js');
const displayProfileRoute=require('./display-profile-page.js')
const entryRoute=require('./entry.js');


// app.use(express.static(__dirname+ '/public'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

app.use(editProfileRoute)
app.use(displayProfileRoute)
app.use(entryRoute);

app.get('/', (req, res) => {
  //res.send('Hello from App Engine! Server started');
  res.sendFile(path.join(__dirname +'/public/index.html'))
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

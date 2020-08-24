const route=require('express').Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const datastore=require('../db.js')

route.post('/calendar',(req,res)=>{

    console.log("Appointment created by: "+req.body.cemail+" for "+req.body.demail);

    //const query=datastore.createQuery('Appointments').filter('doc_email',req.body.demail)
    //                       .order('end_time',{descending: true,});
    // query.run((err,entities,info)=>{
        
    //     console.log(entities.length)

    //         if(entities.length==0) // this doctor doesn't have any appts in the past
    //         //so fetch his availability slot from db and assign the 1st available slot
    //         {
    //             const query2=datastore.createQuery('Doctor').filter('email', req.body.demail);
    //             query2.run((err2,docs,info2)=>{
    //                 console.log(docs[0].time);
    //             })
    //         }
    //         else //doctor has some appointmemts already so his last appointment is in entities[0] due to order descending, 
    //         //assign the next time slot on the same date or if end_time==doctor's end of availabilty time, then assign for next date
    //         {

    //         }
            
    // });

    //calendar connection setup


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
var event = {
  'summary': 'Appointment',
  'description': 'Online consulting',
  'params': {
    'sendNotifications': true
  },
  'start': {
    'dateTime': '2020-08-23T09:00:00',
    'timeZone': 'Asia/Calcutta',
  },
  'end': {
    'dateTime': '2020-08-23T09:15:00',
    'timeZone': 'Asia/Calcutta',
  },
  'attendees': [
    {'email': req.body.Cemail},
    {'email': req.body.Demail},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
        }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created');
        });
    }
//res.render('booking-appointments');
    res.redirect('/')
});

module.exports=route
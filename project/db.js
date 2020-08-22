// const Datastore = require('@google-cloud/datastore');
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore({
  projectId: 'summer20-sps-84',
  keyFilename: 'key.json'
});

module.exports=datastore
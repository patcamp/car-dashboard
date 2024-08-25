const express = require('express');
const retrieve = require('./retrieveData');
const insertData = require('./insertData');
const cors = require('cors')
const app = express(); 
const port = process.env.PORT || 5000; 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  cors();
  
  next();
})

app.get('/allData', async (req, res) => { 
  let end = await retrieve.getAllData().catch(err => {
    console.log(err);
    return err;
  }).then(r => {
    return r;
  });
  
  res.send(end)

});  

app.get('/makes', async (req, res) => { 
  let end = await retrieve.getCountsOfMakes().catch(err => {
    console.log(err);
    return err;
  }).then(r => {
    return r;
  });
  
  res.send(end)

});  

app.listen(port, () => { 
  // insertData();
  console.log(`Server is running on port ${port}`); 
});
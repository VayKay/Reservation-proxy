const newRelic = require('newrelic');
const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require('body-parser');

const port = 8000;
const path = require('path');
const description = 'http://18.221.218.103';
const reservation = 'http://3.84.249.38:3006';
const photo = 'http://52.53.182.87:3002';
const review = 'http://13.57.195.146';


app.use(bodyParser.json());

app.get('/loaderio-7cdf6b435bc7f0800ba9f5ea4e5fc674', (req, res) => {
  res.sendFile('/home/ec2-user/Reservation-proxy/loaderio-7cdf6b435bc7f0800ba9f5ea4e5fc674.txt')
});

app.use('/:listingID',express.static(path.resolve(__dirname,"../public")))

//desciption 
app.all("/listing/desc/:listingID",(req,res)=>{
    console.log('redirecting to Server Listing')
    apiProxy.web(req,res, {target: description});
});
app.all("/listing/amenity/:listingID",(req,res)=>{
    console.log('redirecting to Server Listing')
    apiProxy.web(req,res, {target: description});
});
//reservation
app.all('/listing/:listingID', (req, res) => {
    console.log('redirecting to calendar server');
    apiProxy.web(req, res, {target: reservation});
});
app.all('/custom/month/', (req, res) => {
    console.log('redirecting to calendar server');
    apiProxy.web(req, res, {target: reservation});
});
app.all('/reserved/month/', (req, res) => {
    console.log('redirecting to calendar server'); 
    apiProxy.web(req, res, {target: reservation});
});
app.post('/listing/post', (req, res) => {
  console.log('redirecting to calendar server');
  apiProxy.web(req, res, {target: reservation});
});
//photo
app.all('/api/listings/photos/:listingID', (req, res) => {
    apiProxy.web(req, res, {target: photo});
});
  
app.all("/api/listings/photos/initial/:listingID", (req, res) => {
    apiProxy.web(req, res, {target: photo});
});

//review
app.all('/api/:listingID/reviews', (req, res) => {
    apiProxy.web(req, res, {target: review});
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

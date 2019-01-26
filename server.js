const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))


app.listen(3005, ()=>{
    console.log('App is running on http://localhost:3005')
});
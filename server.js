const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// Database
const db = require('./database');
// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))*/

// ==> ROOT
app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(user => res.json(user))
});

// ==> SIGN IN
app.post('/signin', signin.handleSignin(db, bcrypt));

// ==> REGISTER
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});

// ==> GET PROFILE
app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
});

// ==> GET IMAGE ENTRIES
app.put('/image', (req, res) => {
    entries.handleEntries(req, res, db)
});

// ==> PORT CONF
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
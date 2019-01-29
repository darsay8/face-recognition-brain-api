const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

/*app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))*/

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@doe.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@doe.com',
            password: 'password123',
            entries: 0,
            joined: new Date()
        }
    ],

    login: [
        {
            id: '123',
            hash: '',
            email: 'john@doe.com'
        }
    ]
};

// ==> ROOT
app.get('/', (req, res) => {
    res.send(database.users);
});

// ==> SIGN IN
app.post('/signin', (req, res) => {

    /*bcrypt.compare("bacon", hash, function (err, res) {
        // res == true
    });
    bcrypt.compare("veggies", hash, function (err, res) {
        // res = false
    });*/

    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
});

// ==> REGISTER
app.post('/register', (req, res) => {

    const {email, name, password} = req.body;

    bcrypt.hash(password, null, null, function (err, hash) {
        // Store hash in your password DB.
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1])
});

// ==> GET PROFILE
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {
        res.status(400).json('Not found');
    }
});
// ==> GET IMAGE ENTRIES
app.post('/image', (req, res) => {
    const {id} = req.body;

    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!found) {
        res.status(400).json('Not found');
    }
});

// ==> PORT CONF
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
});


/*//======================================================

    * ROUTES *

*   /                   --> res = Server is running.
*   /signin             --> POST = success/fail.
*   /register           --> POST = user.
*   /profile/:userid    --> GET = user.
*   /image              --> PUT = user.
*
*///======================================================
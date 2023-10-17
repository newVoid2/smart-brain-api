const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt-nodejs')
//const bcrypt = require('bcryptjs');
const cors = require('cors');
app.use(express.json());
app.use(cors())
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cook',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email  && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(404).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    // Load hash from your password DB.
    bcrypt.compare("apple", "$2a$10$2ioJUuxjq0bY385bALvEDubdhneLlgqC8mu.zDwXG4oinEEVJVvBy", function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", "$2a$10$2ioJUuxjq0bY385bALvEDubdhneLlgqC8mu.zDwXG4oinEEVJVvBy", function(err, res) {
        console.log("second guess", res);
    });

    // Using bcryptjs
    // bcrypt.hash(password, 8, function(err, hash) {
    //     console.log(hash)
    // });
    database.users.push({
        id: '432',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach((user) => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(404).json('not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach((user) => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(404).json('not found');
    }
})



app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

/* 
/ --> res = this is working
/ signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
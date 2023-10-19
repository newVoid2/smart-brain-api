const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-pointy-22986',
      user : 'richard',
      password : '',
      database : 'smart-brain'
    }
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success')});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());

app.listen(process.env.PORT || port, () => {console.log(`app is running on port ${process.env.PORT}`)});

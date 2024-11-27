require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Note = require('./models/Note');
const path = require('path');
const cookieParser = require('cookie-parser');
const { addNote, removeNote, getNotes, editNote } = require('./notes.controller');
const { addUser, loginUser } = require('./users.controller');
const auth = require('./middlewares/auth');


const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/register', async (req, res) => {
  res.render('register', {
     title: 'register',
     error: undefined
  });
})

app.get('/login', async (req, res) => {
  res.render('login', {
     title: 'login',
     error: undefined
  });
})


app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie('token', token, {httpOnly: true});

    return res.redirect('/');
  }
  catch(e) {
    let error = e.message;
    if (e.code == 11000) {
      error = 'Email is already registered';
    }

    return res.render('login', { 
      title: 'login',
      error: error
    });
  }
});



app.post('/register', async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);

    return res.redirect('/login');
  }
  catch(e) {
    let error = e.message;
    if (e.code == 11000) {
      error = 'Email is already registered';
    }

    return res.render('register', { 
      title: 'register',
      error: error
    });
  }
});

app.get('/logout', (req, res) => {
  res.cookie('token', '', {httpOnly: true});
  res.redirect('/login');
});


app.use(auth);

app.get('/', async (req, res) => {
  res.render('index', {
     title: '',
     notes: await getNotes(),
     user: req.user.email,
     created: false,
     error: false
  });
})

app.post('/', async (req, res) => {
  if (req?.body?.title) {
    try {
      await addOrUpdateNote(req.body.id, req.body.title, req.user.email);
      
      res.render('index', {
        title: req.body.title,
        notes: await getNotes(),
        user: req.user.email,
        created: true,
        error: false
      });
    } catch(e) {
      console.log('Creation error', e);
      res.render('index', {
        title: req.body.title,
        notes: await getNotes(),
        user: req.user.email,
        created: false,
        error: e.message,
      });
    }
  }
});


app.delete('/:id', async (req, res) => {
  if (req?.params?.id) {
    try {
      await removeNote(req.params.id, req?.user?.email);
          res.render('index', {
         title: 'express app',
         notes: await getNotes(),
         user: req.user.email,
         created: false,
         error: false
      });
    } catch(e) {
      console.log('Creation error', e);
      res.render('index', {
        title: req.body.title,
        notes: await getNotes(),
        user: req.user.email,
        created: false,
        error: e.message,
      });
    }
  }
})

async function addOrUpdateNote(id, title, owner) {
  if (id) {
    return editNote(id, title, owner);
  } 
  else if (title) {
    return addNote(title, owner);
  }
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => {

  app.listen(PORT, () => {
    console.log(chalk.green(`Server has beem started on port ${PORT}`))
  });
} )


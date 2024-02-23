const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Note = require('./models/Note');
const path = require('path');
const { addNote, removeNote, getNotes, editNote } = require('./notes.controller');


const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', async (req, res) => {
  res.render('index', {
     title: '',
     notes: await getNotes(),
     created: false,
     error: false
  });
})

app.post('/', async (req, res) => {
  if (req?.body?.title ) {
    try {
        await addOrUpdateNote(req.body.id, req.body.title);
    }
    catch(e) {
      console.log('Creation error', e);
      res.render('index', {
      title: req.body.title,
      notes: await getNotes(),
      created: false,
      error: true
    });
    }
    
  
    res.render('index', {
       title: req.body.title,
       notes: await getNotes(),
       created: true,
       error: false
    });
  }
})

app.delete('/:id', async (req, res) => {
  if (req?.params?.id) {
    await removeNote(req.params.id);
        res.render('index', {
       title: 'express app',
       notes: await getNotes(),
       created: false,
       error: false
    });    
  }
})

async function addOrUpdateNote(id, title) {
  if (id) {
    await editNote(id, title)
  } 
  else if (title) {
    await addNote(title);
  }
}

mongoose.connect('mongodb+srv://kgck01:teWBpcvJCakeXeBl@cluster0.famly5g.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {

  app.listen(PORT, () => {
    console.log(chalk.green(`Server has beem started on port ${PORT}`))
  });
} )




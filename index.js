const express = require('express');
const chalk = require('chalk');
const http = require('http');
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
     created: false
  });
})

app.post('/', async (req, res) => {
  if (req?.body?.title ) {
    await addOrUpdateNote(req.body.id, req.body.title);
  
    res.render('index', {
       title: req.body.title,
       notes: await getNotes(),
       created: true
    });
  }
})

app.delete('/:id', async (req, res) => {
  if (req?.params?.id) {
    await removeNote(req.params.id);
        res.render('index', {
       title: 'express app',
       notes: await getNotes(),
       created: false
    });    
  }
})

app.listen(PORT, () => {
  console.log(chalk.green(`Server has beem started on port ${PORT}`))
});

async function addOrUpdateNote(id, title) {
  if (id) {
    await editNote(id, title)
  } 
  else if (title) {
    await addNote(title);
  }
}
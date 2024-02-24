const express = require('express')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { addApplication, getApplication } = require('./applications.controller')
const { addUser, loginUser } = require('./users.controller')
const auth = require('./middlewares/auth')

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

app.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login page',
    error: undefined
  })
})

app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie('token', token, { httpOnly: true });

    res.redirect('/')
  } catch (e) {
    res.render('login', {
      title: 'Login page',
      error: e.message
    })
  }
})

app.use(auth);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Заявки',
    applications: await getApplication(),
    userEmail: req.user.email,
    created: false,
    error: false
  })
})

app.get('/form', async (req, res) => {
  res.render('form', {
    title: 'Форма обратной связи',
    success: false,
    error: false
  })
})

app.post('/form', async (req, res) => {
  try {
    await addApplication(req.body['full-name'], req.body['phone-number'], req.body['problem-description']);
    res.render('form', {
      title: 'Форма обратной связи отправлена',
      success: true,
      error: false
    })
  } catch (e) {
    res.render('form', {
      title: 'form',
      success: false,
      error: e.message
    })
  }
})

mongoose.connect(
  'mongodb+srv://kgck01:teWBpcvJCakeXeBl@cluster0.famly5g.mongodb.net/paciants?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  })
})


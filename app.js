const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const postRoutes = require('./routes/postRoutes');
const testRoutes = require('./routes/testRoutes');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'guvenli_anahtar',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/session-user', (req,res)=>{
  if(req.session.user){
    res.json({ user: { username: req.session.user.username } });
  } else {
    res.json({ user: null });
  }
});

app.get('/session-user', (req,res)=>{
  if(req.session.user){
    res.json({ user: true });
  } else {
    res.json({ user: false });
  }
});

app.use(authRoutes);
app.use(noteRoutes);
app.use(postRoutes);
app.use(testRoutes);

module.exports = app ;
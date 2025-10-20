const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');


router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/tests', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/tests.html'));
});

router.get('/attachment', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/attachment.html'));
});

router.get('/okb', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/okb.html'));
});

router.get('/anxiety', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/anxiety.html'));
});


router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});


router.get('/print', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/print.html'));

});

router.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/posts.html'));

});

router.get('/about' ,(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/about.html'));
});

router.get('/eq' ,(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/eq.html'));
});

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;

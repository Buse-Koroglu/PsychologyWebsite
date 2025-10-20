const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const ensureAuth = require('../middlewares/authMiddleware');


router.get('/print', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/print.html'));
    

});

// Yeni post
router.post('/print', ensureAuth, noteController.createNote);



module.exports = router;

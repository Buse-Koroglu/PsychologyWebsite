const path = require('path');

const authMiddleware = (req,res,next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }

   next();

};

function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ 
    message: "Paylaşım yapmak için kayıt olmanız ve giriş yapmanız gerekiyor."
  });
}


module.exports =  ensureAuth;

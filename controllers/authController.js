
const { config }= require('../config/db');
const bcrypt = require('bcryptjs');

const register = async(req , res) => {
    const {username , password} = req.body;
    const hashedPassword = await bcrypt.hash(password,12);

    try {
        const connection = await config();
        await connection.execute('INSERT INTO users (username,password) VALUES (?,?)',[username,hashedPassword]);
        await connection.end();
        
        return res.redirect('/') ;
    } catch (error) {
        res.status(500).send("Kayıt İşlemi Başarısız...");
    }
}

const login = async(req,res) => {
   const {username , password} = req.body;

   try {
    
    const connection = await config();
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?',[username]);
    await connection.end();

    if(rows.length === 0 || !(await bcrypt.compare(password,rows[0].password))){
        return res.send("Giriş İşlemi Başarısız...");
    }

    req.session.user = rows[0];
     return res.redirect('/');

   } catch (error) {
    res.status(500).send("Giriş İşlemi Başarısız...");
   }

}

const logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
};

module.exports ={
    register,
    login,
    logout
} ;

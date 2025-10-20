const { config } = require('../config/db');

const allPosts = async (req,res,next) =>{
   try{
    const connection = await config(); 
    const [rows] = await connection.query(`SELECT posts.id , posts.title , posts.content , posts.created_at, users.username FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC`); 
        
        res.json(rows);
        await connection.end();
   }catch(err){
    console.error(err);
    res.status(500).json({error : "Bir hata oluştu." });
   }
 
};

module.exports = {allPosts};
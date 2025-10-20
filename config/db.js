const mysql = require('mysql2/promise');
const dotenv = require('dotenv'); 

dotenv.config();

const connectionConfig ={
    host : process.env.Database_Host,
    user : process.env.Database_User,
    password : process.env.Database_Password,
    database : process.env.Database_Name,
    port : process.env.Database_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const connectConfig = async () => {
    try {
          const connection = await mysql.createConnection(connectionConfig);
          return connection ;
         
    } catch (error) {
        console.log("Veritabanına Bağlanamadı...")
        throw error;
    }
}

module.exports = { config : connectConfig  } ; /* connectConfig fonksiyonunu artık dışardan config ismiyle import edip bu fonksiyonu çağırarak database'e bağlanabilirim.*/

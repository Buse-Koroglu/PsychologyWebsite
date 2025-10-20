const app = require('./app');
const database = require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Sunucu ${PORT} portunda calisiyor`);
});

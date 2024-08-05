//This file is the main file of the project. It starts the server and loads the routers.
const express = require('express');
const cors = require('cors');
const app = express();
//Routers
const Enter = require('./routers/Enter');
//Server -- Get Player Data
const PlayerData = require('./servers/PlayerData');
//Corn
const cron = require('node-cron');
//mysql
const {writeInDB,deleteExpiredData} = require('./mysql/dbOperations');
//Favicon
const favicon = require('serve-favicon');
const path = require('path');

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//process.env.PORT
const port = 3000;
//static files
app.use(favicon(path.join(__dirname, 'public', 'sr.ico')));
app.use(express.static('public'));

//Load Routers
Enter(app);

app.get('/',(req,res)=>{
   res.render("index.html");
})

///Start Server
app.listen(port,()=>{
   console.log(`Server is running http://localhost:${port}`);
});

//Cron Job to update player data
// cron.schedule('* * * * *',()=>{
//    console.log('Running updatePlayerData()...');
//    updatePlayerData().then(() => {
//       console.log('updatePlayerData() completed');
//     }).catch(err => {
//       console.error('Error in updatePlayerData():', err);
//     });
// })
//Function to update player data
async function updatePlayerData(){
   try{
      const playerData = await PlayerData();
      await writeInDB(playerData);
      await deleteExpiredData();
   }catch (e) {
      console.error('Error:', e);
   }
}
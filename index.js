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

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//process.env.PORT
const port = 3000;
app.use(express.static('public'));

//Load Routers
Enter(app);

///Start Server
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
})

app.get('/',(req,res)=>{
   res.render("index.html");
})

//Cron Job to update player data every 10 minutes
cron.schedule('* * * * *',()=>{
   console.log('Running updatePlayerData()...');
   updatePlayerData().then(() => {
      console.log('updatePlayerData() completed');
    }).catch(err => {
      console.error('Error in updatePlayerData():', err);
    });
})

//Function to update player data
async function updatePlayerData(){
   try{
      const playerData = await PlayerData();
      console.log(playerData);
   }catch (e) {
      console.error('Error:', e);
   }
}
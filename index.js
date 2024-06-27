const express = require('express');
const cors = require('cors');
const app = express();
//Routers
const Enter = require('./routers/Enter');
//Server
const PlayerData = require('./servers/PlayerData');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//process.env.PORT
const port = 3000;
app.use(express.static('public'));

Enter(app);


app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
})

app.get('/',(req,res)=>{
   res.render("index.html");
})

async function updatePlayerData(){
   try{
      const playerData = await PlayerData();
      console.log(playerData);
   }catch (e) {
      console.error('Error:', e);
    }
}
updatePlayerData();
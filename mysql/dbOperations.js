const Connect = require('./Connect');
const PlayerList = require('../servers/PlayerList');
const { GetTable } = require('../utils/MatchTool');
const { ComparisonTime } = require('../utils/TimeTool');


// Check if the time already exists in the table
async function checkTime(time, playerId){
   const query = `SELECT * FROM ${GetTable(playerId)} WHERE time = \"${time}\"`;
   const [rows] = await Connect.query(query);
   return rows.length <= 0;
}

// Write data in the table
async function writeInDB(playerData) {
   const promises = playerData.map(async (v)=>{
      if(await checkTime(v.time, v.playerId)){
         // Database commands
         const query = `INSERT INTO ${GetTable(v.playerId)} (time,nickName,team,matchMap,matchScore,matchResult,matchId,roomUrl,bestOf,effectiveRanking,mapimage,totalKills,totalDeaths,totalAssistsL,rating,tripleKill,quadroKill,pentaKill,timestamp) VALUES 
                     (\"${v.time}\",\"${v.nickname}\",\"${v.team}\",\"${v.matchMap}\",\"${v.matchScore}\",\"${v.matchResult}\",\"${v.matchId}\",\"${v.roomUrl}\",\"${v.bestOf}\",\"${v.effectiveRanking}\",\"${v.mapimage}\",\"${v.totalKills}\",\"${v.totalDeaths}\",\"${v.totalAssistsL}\",\"${v.rating}\",\"${v.tripleKill}\",\"${v.quadroKill}\",\"${v.pentaKill}\",\"${v.timestamp}\")`;
         try{
            await Connect.query(query);
            console.log(`Player ${GetTable(v.playerId)} Match added to DB`);
         }catch(err){
            console.error('Error Write to DB:', err);
            throw err;
         }
      }else{
         console.log(`Player already exists in ${GetTable(v.playerId)} at ${v.time}`);
      }
   });
   await Promise.all(promises);
}

//Delete expired match data
async function deleteExpiredData(){
   try{
      const promises = PlayerList.map(async (player)=>{
         const query = `SELECT * FROM ${player.split(' ')[0]}`;
         const [rows] = await Connect.query(query);
         let timeList = [];
         //Push Expired time to timeList
         rows.forEach(row => {
            timeList.push(row.timestamp);
         });
         //Check whether the match is expired and delete the corresponding match
         timeList.forEach(async time =>{
            if(ComparisonTime(time)){
               const query = `DELETE FROM ${player.split(' ')[0]} WHERE timestamp = "${time}"`;
               await Connect.query(query);
               console.log(`Player ${player.split(' ')[0]} Match deleted from DB at ${time}`);
            }
         })
      })
      await Promise.all(promises);
   }catch(err){
      console.error('Error Delete Expired Data:', err);
   }
   
}

module.exports = { writeInDB, deleteExpiredData };

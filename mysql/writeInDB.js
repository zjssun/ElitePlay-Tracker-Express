const Connect = require('./Connect');
const { GetTable } = require('../utils/MatchTool');

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
                     (\"${v.time}\",\"${v.nickname}\",\"${v.team}\",\"${v.matchMap}\",\"${v.matchScore}\",\"${v.matchResult}\",\"${v.matchId}\",\"${v.roomUrl}\",\"${v.bestOf}\",\"${v.effectiveRanking}\",\"${v.mapimage}\",\"${v.totalKills}\",\"${v.totalDeaths}\",\"${v.totalAssistsL}\",\"${v.rating}\",\"${v.tripleKill}\",\"${v.quadroKill}\",\"${v.quadroKill}\",\"${v.timestamp}\")`;
         try{
            await Connect.query(query);
            console.log(`Player ${v.playerId} added to DB`);
         }catch(err){
            console.error('Error Write to DB:', err);
            throw err;
         }
      }else{
         console.log(`Player ${v.playerId} already exists in ${GetTable(v.playerId)} at ${v.time}`);
      }
   });
   await Promise.all(promises);
}

module.exports = writeInDB;

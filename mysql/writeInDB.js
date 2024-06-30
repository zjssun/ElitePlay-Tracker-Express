const DBcfg = require('./DBcfg');
const { GetTable } = require('../utils/MatchTool');

async function checkTime(time, playerId){
   const query = `SELECT * FROM ${GetTable(playerId)} WHERE time = \"${time}\"`;
   const [rows] = await DBcfg.query(query);
   return rows.length <= 0;
}

async function writeInDB(playerData) {
   const promises = playerData.map(async (v)=>{
      if(await checkTime(v.time, v.playerId)){
         const query = `INSERT INTO ${GetTable(v.playerId)} (time,nickName,team,matchMap,matchScore,matchResult,matchId,roomUrl,bestOf,effectiveRanking,mapimage,totalKills,totalDeaths,totalAssistsL,rating,tripleKill,quadroKill,pentaKill) VALUES 
                     (\"${v.time}\",\"${v.nickname}\",\"${v.team}\",\"${v.matchMap}\",\"${v.matchScore}\",\"${v.matchResult}\",\"${v.matchId}\",\"${v.roomUrl}\",\"${v.bestOf}\",\"${v.effectiveRanking}\",\"${v.mapimage}\",\"${v.totalKills}\",\"${v.totalDeaths}\",\"${v.totalAssistsL}\",\"${v.rating}\",\"${v.tripleKill}\",\"${v.quadroKill}\",\"${v.quadroKill}\")`;
         try{
            await DBcfg.query(query);
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

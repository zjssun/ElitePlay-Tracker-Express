const axios = require('axios');
const {get,set,del} = require('../utils/DateCache');
const {GetTime} = require('../utils/TimeTool');
const {figureResult,FindTeam,MapImageUrl} = require('../utils/MatchTool');

const PlayerList = require('./PlayerList');

const getData = async (data)=>{
   try{
      if(!data) return [];
      const promises = data.map(async (v)=>{
         //Check if it is a training match
         if(v.bestOf === "2"){
            const MatchRoom = `https://www.faceit.com/api/match/v2/match/${v.matchId}`;
            const MatchDetail = `https://www.faceit.com/api/stats/v1/stats/matches/${v.matchId}`;
            const Room = await axios.get(MatchRoom);
            // const Rooms = JSON.stringify(Room.data);
            // const mapsMatch = JSON.parse(`{${Rooms.match(/("maps":\s*\[[\s\S]*?\])/)}}`).maps[0];
            let RoomDetail = {
               effectiveRanking:`${Room.data.payload.entityCustom.effectiveRanking}` || "0",
               mapimage:MapImageUrl(v.i1),
            };

            const Detail = await axios.get(MatchDetail);
            const Details = JSON.stringify(Detail.data);
            const teamKeyIndex = Details.indexOf('"teams":');
            const teamContent = JSON.parse(`{${Details.slice(teamKeyIndex,-1)}`);
            let PlayerDetail= FindTeam(teamContent.teams,v.i5,v.nickname);
            return{
               time:GetTime(v.created_at,'YYYY/MM/DD,hh:mm:ss'),
               nickname:v.nickname,
               playerId:v._id.playerId,
               team:v.i5,
               matchMap:v.i1,
               matchScore:v.i18,
               matchResult:figureResult(v.i18,v.c5),
               matchId:v.matchId,
               roomUrl:`https://www.faceit.com/en/cs2/room/${v.matchId}/scoreboard`,
               bestOf:v.bestOf,
               timestamp:v.created_at,
               ...RoomDetail,
               ...PlayerDetail
            }
         }else{
            return {
               time:GetTime(v.created_at,'YYYY/MM/DD,hh:mm:ss'),
               nickname:v.nickname,
               playerId:v._id.playerId,
               team:v.i5,
               matchMap:v.i1,
               matchScore:v.i18,
               matchResult:figureResult(v.i18,v.c5),
               mapimage:MapImageUrl(v.i1),
               matchId:v.matchId,
               roomUrl:`https://www.faceit.com/en/cs2/room/${v.matchId}/scoreboard`,
               bestOf:v.bestOf,
               timestamp:v.created_at,
            };
         }
      });
      return await Promise.all(promises);
   }catch(e){
      console.error('Error get player data:', e);
   }
}

const getPlayerDate = async () => {
   let FinalData = [];
   try {
      const promises = PlayerList.map(async (v) => {
         const playerId = v.split(' ')[1];
         const response = await axios.get(`https://www.faceit.com/api/stats/v1/stats/time/users/${playerId}/games/cs2?page=0&size=10&game_mode=5v5`);
         const matchHistory = response.data;
         let playerData = await getData(matchHistory);
         FinalData = [...FinalData, ...playerData.filter(v => v !== null)];
     });
     await Promise.all(promises);
     return FinalData;
   } catch (e) {
     console.error('Error fetching player data:', e);
   }
}

module.exports = getPlayerDate;
const axios = require('axios');
const {get,set,del} = require('../utils/DateCache');
const {GetTime} = require('../utils/TimeTool');
const {figureResult,formatRating} = require('../utils/MatchTool');

const PlayerList = require('./PlayerList');

const getData = async (data)=>{
   try{
      if(!data) return [];
      const promises = data.map(async (v)=>{
         const MatchRoom = `https://www.faceit.com/api/match/v2/match/${v.matchId}`;
         const MatchDetal = `https://www.faceit.com/api/stats/v1/stats/matches/${v.matchId}`;
         let effectiveRanking = "0";
         let playerAdr = "";
         if(v.bestOf === "2"){
            const Room = await axios.get(MatchRoom);
            effectiveRanking = Room.data.payload.entityCustom.effectiveRanking;
            const Detal = await axios.get(MatchDetal);
            const Details = JSON.stringify(Detal.data);
            const teamKeyIndex = Details.indexOf('"teams":');
            const teamContent = JSON.parse(`{${Details.slice(teamKeyIndex,-1)}`);
            const PlayerInTeam = teamContent.teams.find(team=>team.teamId === v.teamId);
            const targetPlayer = PlayerInTeam.players.find(player=>player.playerId === v.playerId);
            playerAdr = targetPlayer.c10 || "unstats";
         }else{
             effectiveRanking = "0";
         }
         return{
            time:GetTime(v.created_at,'YYYY/MM/DD,hh:mm:ss'),
            nickname:v.nickname,
            playerId:v.playerId,
            team:v.i5,
            matchMap:v.i1,
            matchScore:v.i18,
            matchResult:figureResult(v.i18,v.c5),
            matchId:v.matchId,
            roomUrl:`https://www.faceit.com/en/cs2/room/${v.matchId}/scoreboard`,
            bestOf:v.bestOf,
            timestamp:v.created_at,
            totalKills:v.i6,
            totalDeaths:v.i8,
            totalAssistsL:v.i7,
            rating:formatRating(v.c2),
            adr:playerAdr,
            tripleKill:v.i14 || "0",
            quadroKill:v.i15 || "0",
            pentaKill:v.i16 || "0",
            effectiveRanking:effectiveRanking,
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
         const response = await axios.get(`https://www.faceit.com/api/stats/v1/stats/time/users/${playerId}/games/cs2?page=0&size=3&game_mode=5v5`);
         const matchHistory = response.data;
         let playerData = await getData(matchHistory);
         FinalData = [...FinalData, ...playerData];
     });
     await Promise.all(promises);
     return FinalData;
   } catch (e) {
     console.error('Error fetching player data:', e);
   }
}

module.exports = getPlayerDate;
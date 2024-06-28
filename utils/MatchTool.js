// figure the result of win or loss based on the match score and the user's score
function figureResult(matchScore,selfScore){
   const [x, y] = matchScore.split('/').map(Number);
   let ResetScore = "";
   let matchResult = "";
   // Reorder the match scores
   if(x>y){
      ResetScore=`${x}/${y}`;
   }else{
      ResetScore=`${y}/${x}`;
   }
   //Judge the Result
   const [teamScore, opponentScore] = ResetScore.split('/').map(Number);
   if (teamScore === Number(selfScore)) {
      matchResult = 'win';
  } else {
      matchResult = 'loss';
  }
  return matchResult;
}

//Find out which team the player is on
function FindTeam(Data,selfteam,nickname){
   const team = Data.find(team=>team.i5===selfteam);
   if(team){
      const players = team.players.find(players=>players.nickname===nickname);
      if(players){
         return{
            totalKills:players.i6,
            totalDeaths:players.i8,
            totalAssistsL:players.i7,
            rating:players.c2,
            tripleKill:players.i14 || 0,
            quadroKill:players.i39 || 0,
            pentaKill:players.i16 || 0,
         }
      }else{
         console.log(`Player ${players} not found.`);
      }
   }else{
      console.log(`Team ${selfteam} not found.`);
   }
}

//Map Image URL
function MapImageUrl(mapName){
   switch(mapName){
      case "de_mirage":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg";
      case "de_dust2":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg";
      case "de_nuke":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg";
      case "de_anubis":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg";
      case "de_ancient":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg";
      case "de_vertigo":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3bf25224-baee-44c2-bcd4-f1f72d0bbc76_1695819180008.jpeg";
      case "de_inferno":
         return "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg";
      default:
         return "";
   }
}

module.exports = {
   figureResult,
   FindTeam,
   MapImageUrl
}
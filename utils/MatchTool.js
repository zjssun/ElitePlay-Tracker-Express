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
            tripleKill:players.i14 || "0",
            quadroKill:players.i39 || "0",
            pentaKill:players.i16 || "0",
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

function GetTable(id){
   switch(id){
      case "93306681-bce6-4369-8c41-e0bdba2597ed":
         return "m0nesy";
      case "e5e8e2a6-d716-4493-b949-e16965f41654":
         return "donk";
      case "ac71ba3c-d3d4-45e7-8be2-26aa3986867d":
         return "s1mple";
      case "09701d83-187e-41e6-997d-a50b3e8d4d38":
         return "im";
      case "97f7d868-7221-46eb-a250-38ffaf1cc5c1":
         return "elige";
      case "d3de50b6-c0fb-4d93-a304-0bdf7749ea5d":
         return "ropz";
      case "23b6ffbb-86ec-47ab-acaa-9c76bed0af66":
         return "jl";
      case "591e26a3-eb86-4d4c-afa8-b5754455dc03":
         return "w0nderful";
      case "19606e0c-137b-4885-a904-744fa12d25f6":
         return "niko";
      case "f4c95e23-8930-49a5-b49d-94eff8b412f4":
         return "jame";
      case "9a8ea9d5-61c7-4b38-b64f-35f4945048fa":
         return "jks";
      case "3b536dda-e3dd-40cd-baed-7e66ab050c8f":
         return "zywoo";
      default:
         return "unknown";
   }
}
module.exports = {
   figureResult,
   FindTeam,
   MapImageUrl,
   GetTable
}
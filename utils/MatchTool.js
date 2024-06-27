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



module.exports = {
   figureResult,
   FindTeam
}
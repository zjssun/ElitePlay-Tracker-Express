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

//Get Table Name
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
      case "a51c1404-1c5e-4688-b82c-ade59245e5b1":
         return "twistzz";
      case "928857e9-48e7-41b1-b4e8-217fd1a6e51b":
         return "electronic";
      case "c365e0fe-ae29-41d7-b331-ed8904e32d2b":
         return "kscerato";
      default:
         return "unknown";
   }
}

//Format Rating
function formatRating(str) {
   const parts = str.split('.');
   if (parts.length === 1) {
     return str + '.0';
   } else if (parts.length === 2 && parts[1].length <= 2) {
     return str;
   } else {
     return str;
   }
 }


module.exports = {
   figureResult,
   GetTable,
   formatRating
}
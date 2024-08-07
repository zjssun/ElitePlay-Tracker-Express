const express = require('express');
const router = express.Router();
const Connect = require('../mysql/Connect');
const { get,set,del } = require('../utils/DateCache');

const allKey = "SELECTALL" 

// get all data from all DB
router.get('/all',async (req,res)=>{
   try{
      // check if cache exists
      let alldata = await get(allKey);
      // if cache didn't exists
      if(!alldata || alldata.length === 0){
         const query = `  SELECT * FROM (
                  SELECT * FROM donk UNION ALL
                  SELECT * FROM elige UNION ALL
                  SELECT * FROM jame UNION ALL
                  SELECT * FROM m0nesy UNION ALL
                  SELECT * FROM ropz UNION ALL
                  SELECT * FROM im UNION ALL
                  SELECT * FROM jks UNION ALL
                  SELECT * FROM niko UNION ALL
                  SELECT * FROM jl UNION ALL
                  SELECT * FROM s1mple UNION ALL
                  SELECT * FROM w0nderful UNION ALL
                  SELECT * FROM zywoo
                  ) AS combined_tables
                  ORDER BY time DESC;
               `
         // execute query and get data
         alldata = await Connect.query(query);
         // set data to cache
         await set(allKey,alldata);
      }
      res.send({
         message: "success",
         playerMatch: alldata[0]
      });
   }catch(err){
      console.error(err);
      res.send({
         message: "error",
         error: err
      });
   }

});

// get data by player name
router.get('/:playerName',async (req,res)=>{
   const playerName = req.params.playerName;
   const playerKey = `SELECT${playerName}`;
   try{
      let playerData = await get(playerKey);
      if(!playerData || playerData.length === 0){
         const query = `SELECT * FROM ${playerName} ORDER BY time DESC`
         // execute query and get playerdata
         playerData = await Connect.query(query);
         // set data to cache
         await set(playerKey,playerData);
      }
      res.send({
         message: "success",
         playerMatch: playerData[0]
      });
   }catch(err){
      console.error("Get PlayerData Error:",err);
      res.send({
         message: "error",
         error: err
      });
   }
})

// get data by match Time
router.post('/matchTime',async (req,res)=>{
   const {time} = req.body;
   const matchTimeKey = `SELECT${time}`;
   try{
      let playerData = await get(matchTimeKey);
      if(!playerData || playerData.length === 0){
         const query = `
            SELECT * FROM(
               SELECT * FROM donk WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM im WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM elige WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM jame WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM jks WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM jl WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM m0nesy WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM niko WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM ropz WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM s1mple WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM w0nderful WHERE time LIKE '%${time}%' UNION ALL
               SELECT * FROM zywoo WHERE time LIKE '%${time}%'
            )AS combined_tables ORDER BY time DESC
         `
         // execute query and get playerdata
         playerData = await Connect.query(query);
         // set data to cache
         await set(matchTimeKey,playerData);
      }
      res.send({
         message: "success",
         playerMatch: playerData[0]
      });
   }catch(err){
      console.error("Get MatchTime Error:",err);
      res.send({
         message: "error",
         error: err
      })
   }
})
module.exports = router;
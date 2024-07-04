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
                  SELECT * FROM donk
                  UNION ALL
                  SELECT * FROM elige
                  UNION ALL
                  SELECT * FROM jame
                  UNION ALL
                  SELECT * FROM m0nesy
                  UNION ALL
                  SELECT * FROM ropz
                  UNION ALL
                  SELECT * FROM im
                  UNION ALL
                  SELECT * FROM jks
                  UNION ALL
                  SELECT * FROM niko
                  UNION ALL
                  SELECT * FROM jl
                  UNION ALL
                  SELECT * FROM s1mple
                  UNION ALL
                  SELECT * FROM w0nderful
                  UNION ALL
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
         data: alldata[0]
      });
   }catch(err){
      console.error(err);
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
         playerName: playerData[0]
      });
   }catch(err){
      console.error("Get PlayerData Error:",err);
   }
})

module.exports = router;
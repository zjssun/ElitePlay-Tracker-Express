const express = require('express');
const router = express.Router();
const Connect = require('../mysql/Connect');

router.get('/',async (req,res)=>{
   const connect = await Connect();
   res.send({
      Connect:connect
   });
});

module.exports = router;
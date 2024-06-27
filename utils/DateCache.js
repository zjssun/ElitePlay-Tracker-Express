const NodeCache = require('node-cache');

// del cache every 600 seconds; check every 60 seconds
const cache = new NodeCache({stdTTL: 600, checkperiod: 60});

// set cache;Return true or false
const set = async(key,obj,ttl=600)=>{
   return cache.set(key,obj,ttl);
}

// get cache;Return obj
const get = async(key)=>{
   return cache.get(key);
}

// del cache
const del = async(key)=>{
   return cache.del(key);
}

module.exports = {set,get,del};
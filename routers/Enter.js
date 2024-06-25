const GetMatch = require('./GetMatch');

module.exports = (app)=>{
   app.use('/getmatch',GetMatch);
}
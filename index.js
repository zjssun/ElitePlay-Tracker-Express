const express = require('express');
const cors = require('cors');
const app = express();

const Enter = require('./routers/Enter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//process.env.PORT
const port = 3000;
app.use(express.static('public'));

Enter(app);

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
})

app.get('/',(req,res)=>{
   res.render("index.html");
})


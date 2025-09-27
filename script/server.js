const express = require('express');
const path = require('path');
const app = express();

// console.log(__dirname);
app.use(express.static(path.join(__dirname,'../','style')));
app.use(express.static(path.join(__dirname,'../media')));

console.log(__dirname);

app.get('/',(req,res,next)=>{
       res.sendFile(path.join(__dirname,'../','views','index.html'));
});

app.get('/activities',(req,res,next)=>{
      res.sendFile(path.join(__dirname,'../','views','activities.html'));
});

const PORT = 3002;
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});
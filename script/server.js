const express = require('express');
const path = require('path');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../','views'));

// console.log(__dirname);
app.use(express.static(path.join(__dirname,'../','style')));
app.use(express.static(path.join(__dirname,'../media')));

console.log(__dirname);

app.get('/',(req,res,next)=>{
      res.render('index');
});

app.get('/activities',(req,res,next)=>{
       res.render('activities');
});

app.get('/about',(req,res,next)=>{
       res.render('about');
})

const PORT = 3002;
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});
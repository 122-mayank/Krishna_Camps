const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const SibTransport = require('nodemailer-sendinblue-transport');
require('dotenv').config();

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../','views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

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
});

app.get('/contact-us',(req,res,next)=>{
        res.render('contact');
});

const transporter = nodemailer.createTransport(
  new SibTransport({
    apiKey: process.env.SENDINBLUE_API_KEY
  })
);

// 📨 Handle form submission
app.post('/submit', async (req, res) => {
  const { name ,schoolname, email, contact, designation } = req.body;

  if(contact.length != 10){
       res.status(500).send('Error');
  }

  const mailOptions = {
    from: process.env.SENDER_EMAIL, // use a verified sender from Brevo
    to: process.env.MANAGER_EMAIL,
    subject: `New Contact Form Submission from ${schoolname}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong>${name}</p>
      <p><strong>School Name:</strong> ${schoolname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Designation:</strong> ${designation}</p>
    `
  };


    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).send('Success'); // AJAX will handle redirect
    } catch(err) {
        console.error('Error sending email:', err);
        res.status(500).send('Error');
    }
});


app.get('/about/:activity',(req,res)=>{
       const {activity} = req.params;
       res.render('description',{activity});
});



const PORT = 3002;
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
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

app.post('/submit', async (req, res) => {
    const { schoolname, email, contact, designation } = req.body;

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user : process.env.SENDER_EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    let mailOptions = {
        from: `"Krishna Camps Website" <${process.env.SENDER_EMAIL}>`,
        to: process.env.MANAGER_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission from ${schoolname}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>School Name:</strong> ${schoolname}</p>
            <p><strong>Email ID:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contact}</p>
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


const PORT = 3002;
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes');
// const { getAll } = require('./controllers/blog');
 
const app=express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => console.log('Database Connected Successfully'))

    
.catch((err) =>console.log(err));


app.use(express.json());

app.use('/',routes) ;
//app.get('/',getAll);


app.use((req,res,next)=>{
    debugger;
    res.status(404).json({err:'not found'});
});

app.use((err,req,res,next)=>{
       // debugger;
        console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();

});

const { PORT=3000 }=process.env
app.listen(PORT,()=>{
    console.log('app is up and ready on:',PORT)
})
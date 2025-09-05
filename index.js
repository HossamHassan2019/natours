const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routers/userRouter');
const tourRouter = require('./routers/tourRouter');
const app = express();


if(process.env.NODE_ENV === 'development'){ 
    app.use(morgan('dev'));
// app.use(morgan('dev', { immediate: true }));
}



// This registers a middleware in Express that automatically parses incoming JSON 
// request bodies into a JavaScript object and attaches it to req.body.
app.use(express.json()); //middle-ware


app.use('/api/v1/tours' , tourRouter);
app.use('/api/v1/users' , userRouter);

module.exports = app;




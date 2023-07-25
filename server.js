const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db')


require('dotenv').config();
require('colors');


connectDB();

const app = express();



if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.get('*',function(req, res){

    console.log('Endpoint donot exist');
    res.status(404).send('Endpoint donot exist');
});

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`server is connected in ${process.env.NODE_ENV} mode on port ${PORT}` .red)
);
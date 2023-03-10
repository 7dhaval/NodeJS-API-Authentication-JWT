const express = require('express');
const morgan = require("morgan");
const createError =  require("http-errors");
require('dotenv').config();
const AuthRoute = require("./Routes/auth.route");
require('./helpers/db.conn');
const bodyParser = require('body-parser');
const { verfiyAccessToken } = require("./helpers/jwt_helper")

const app = express();

app.use('/auth', AuthRoute);
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', verfiyAccessToken,async (req, res, next) => {   
    res.send("Hello From Express..");
});

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error : {
            status : err.status || 500,
            message : err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});
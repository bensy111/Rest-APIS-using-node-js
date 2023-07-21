// import express, body-parser and cors 

// building REST APIs
const express = require("express");

// help to parse the request and create the request. body object
const bodyParser = require("body-parser");

// middleware to protect api
const cors = require("cors");

//defining app framework
const app = express();

// parse requests of content type - application/json
app.use(bodyParser.json());

// parse requests of content type application/ x-www-form-urlencoreded
app.use(bodyParser.urlencoded({extended: true}));

// simple API request
app.get("/v1/get-root",(request,response) => {

    response.json ({
        message : "my first API request"
    });

});
// adding two numbers
app.get("/v1/get-add-numbers",(request,response) =>{
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = a + b;
    console.log("the sum is " + c);

    if(!a && !b){
        response.status(300).send({
            message: "both params have not been passed",
            status : "error",
            status_code: 300
        });

    } else if (!a){
        response.status(400).send({
         message : "first param is not passed",
         status : "error",
         status_code : 500   
        });
    }else if(!b){
        response.status(600).send({
            message : " second param is not passed",
            status : "error",
            status_code : 600
        });

    } else if(typeof request.query.a !== 'number'){
        response.status(700).send ({
            message : " fist param is not an interger",
            status: "error",
            status_code : 700

        });

    }else if(typeof request.query.b !=='number'){
        response.status(800).send({
            message: "second param is not an interger",
            status : "error",
            status_code : 800
        });

    } else if(typeof request.query.a !=='number' && typeof request.query.b !=='number'){
        response.status(900).send({
            message: "both params are not integers",
            status: "error",
            status_code : 900
        });

    }
    else {
    response.json({
        message: `when you add ${a} and ${b} you get ${c}`,
        status : "sucess",
        status_code : 1000
    });
    }

});
app.get("/v1/get-root-param",(request,response) => {
    const id_= request.query.id;
    
    
    if(!id_){
        // invalid request if ID param is not included
        response.status(400).json ({
            message : "id param not passed, please pass param parameter",
            status: "error",
            status_code: 400
        });
    }else if(id_ ==100){
        // valid request if ID is 100
        response.json({
            message: "valid request",
            status: "sucess",
            status_code: 200
        })

    }else{
        // invalid request if ID is not 100
        response.status(400).json ({
            message : "invalid ID ",
            status: "error",
            status_code: 400
        });

    }

});

// import models

// create tables if they dont exist
const db = require('./models');
db.sequelize_me.sync();

// define other routes
require("./routes/student.routes.js")(app);
require("./routes/staff.routes.js")(app);
require('./routes/sample_data.js')(app);

// define the port of the project will run on
//const PORT = process.env.PORT;
const PORT =8082;

// listen to the port
app.listen(PORT,() => {
    console.log(`server sucessively started at port - ${PORT}.`);
});



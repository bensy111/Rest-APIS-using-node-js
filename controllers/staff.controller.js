// import modules
const db = require("../models");
// import Sequelize Student model from index
const Staff = db.staff;
//const Op

// creates and saves a new staff
exports.create = (request, response) =>{
    if( !request.body.first_name){
        response.status(400).send({
            message : " fill in the first name",
            status : "error",
            status_code : 400
        });
        return ;
    }
    else if(!request.body.last_name){
        response.status(401).send({
            message : "fill in last name",
            status : "error",
            status_code : 401
        });
        return;

    }
    else if(!request.body.gender){
        response.status(402).send({
            message : "fill in gender",
            status : "error",
            status_code : 402
        });
        return;

    }
    else if(!request.body.phonenumber){
        response.status(403).send({
            message : "fill in phone number",
            status : "error",
            status_code : 403
        });
        return;

    }

    //
    const add_staff = {
        first_name: request.body.first_name,
        last_name : request.body.last_name,
        gender : request.body.gender,
        phonenumber : request.body.phonenumber,
        
    }

    // pass student object to Sequelize Create function 
    // Sequelize Create helps to 
    Staff.create(add_staff)
         .then(data =>{
            // return data on sucess
            //response.send(data);
            // modified response
            response.status(500).send({
                message : "data sent to db",
                status :"sucessfull", 
                data: data
            });
         })
         .catch (err =>{
            // return error on failure
            response.status(400).send({
                message : err.message || "error occured while adding Student "
            });
         });

}
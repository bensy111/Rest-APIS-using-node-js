// import modules
const { request, response } = require("express");
const db = require("../models");
const { where } = require("sequelize");
// import Sequelize Student model
const Student = db.students;

// sequelize  Sql caluse
const Op =db.Sequelize.Op;

// deletes students
exports.delete_student =(request,response)=>{
   /* const id = request.query.id;
    (async ()=>{
        try {
            await db.Sequelize.sync();

            var condition2= id ? { id: {[Op.like]:`%${id}%`}} : null;

            const user = await Student.findOne({where: {condition2}});
            if(user){
                await.destroy();

            }
        }
    });*/

    const id = request.query.id;
    var condition2= id ? { id: {[Op.like]:`%${id}%`}} : null;


    Student.destroy({where:condition2})
        .then (data =>{
            response.send ({
                message: "deleted successively"
            }); 
        })
        .catch(err =>{
            response.status(400).send({
                message : err.message || "error ocurred while deleting data"
            });
        });


}

// api to retrieve all students
exports.retrieve_Students =(request,response) =>{
    const first_name =request.query.first_name;
    
    // if first name pased is like wat is in first name else null
    var condition = first_name ? { first_name: {[Op.like]:`%${first_name}%`}} : null;

    var condition_equals = first_name ? {first_name: `${first_name}`} : null;

    // findall function in sequelize 
    Student.findAll({})
        .then(data =>{
            response.send(data);
        })
        .catch(err =>{
            response.status(400).send({
                message: err.message || "error occured while retrieving students"
            });
        });

};

// updates students given record based on a given id
exports.update_student = (request,response)=>{
    const id =request.params.id;
    var condition1 = id ?{ id:{[Op.like]:`${id}`}} :null;
    
    Student.update(request.body,{where: {id: id}})
        .then (num =>{
            console.log("return",num);
           if(num > 0){
                response.send({
                    message : `student with  id= ${id} updated sucessfully`,
                    status : "sucess",
                    status_code : 100
                });
           }
           else {
              response.send({
                message : `student with  id= ${id} not found`,
                status : "error",
                status_code : 400
              });  
           }
        })
        .catch (err=>{
            response.status(500).send({
                message: err.message || `error occured while updating student with id =${id}`
            });
        });



};

// creates and saves a new student
exports.create = (request, response) =>{
    if( !request.body.first_name){
        response.status(400).send({
            message : " fill in the first name"
        });
        return ;
    }

    const add_student = {
        first_name: request.body.first_name,
        last_name : request.body.last_name,
        gender : request.body.gender,
        class : request.body.class,
        physical_address : request.body.physical_address,
        status : request.body.status ? request.body.status: false
    }



    // pass student object to Sequelize Create function 
    // Sequelize Create helps to 
    Student.create(add_student)
         .then(data =>{
            // return data on sucess
            response.send(data);
         })
         .catch (err =>{
            // return error on failure
            response.status(400).send({
                message : err.message || "error occured while adding Student "
            });
         });

}
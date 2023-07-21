module.exports = app => {
    // import student controller
    const student_logic = require('../controllers/student.controller.js');
    
    // import express router
    var router = require("express").Router();
    // create student api route
    router.post("/add",student_logic.create);

    // update student records
    router.put ("/:id",student_logic.update_student);

    router.delete("/delete", student_logic.delete_student);


    // retrieve all students api route
    router.get("/return",student_logic.retrieve_Students);
    // => http://localhost:8082/students/return
    // define default route
    app.use('/students',router);


}
// http:// localhost:8082/students/add
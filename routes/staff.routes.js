module.exports = app => {
    // import student controller
    const staff_logic = require('../controllers/staff.controller');
    
    // import express router
    var router = require("express").Router();
    // create student api route
    router.post("/add",staff_logic.create);

    

    // define default route
    app.use('/staff',router);


}
// http:// localhost:8082/staff/add
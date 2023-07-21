module.exports =app =>{

var express = require('express');
var router = express.Router();
var database = require('../database.js');

router.get("/",function(request,response,next){
    response.send('list all sample data');
    var query = "SELECT * FROM students ORDER BY id DESC";
    database.query (query,function(error,data){
        if(error)
        {
            throw error;
        }
        else
        {
            response.render('sample_data',{title: 'my crude application',action: 'list',sampleData: data});
        }
    });
});


router.get("/add_data",function(request,response,next){
    response.render("sample_data",{title:'insert data into MySQL',action:'add'});
});
router.post("/add_sample_data",function(request,response,next){
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var class1 = request.body.class;
    var gender = request.body.gender;
    var physical_address = request.body.physical_address;
    var status = request.body.status;

    var query = `INSERT INTO students (first_name,last_name,class,gender,physical_address,status) VALUES ("${first_name}","${last_name}","${class1}","${gender}","${physical_address}","${status}}")`;
    database.query(query,function(error,data){
        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect("/sample_data");
        }
    });
});

router.get('/edit/:id',function( request,response,next){
    var id = request.params.id;

    var query = `SELECT * FROM students WHERE id ="${id}"`;

    database.query(query, function(request,response,next){
        response.render('sample_data',{title: 'edit the table', action :'edit,', sampleData : data[0]});
    });
});

router.post('/edit/:id',function(request,response,next){
    var id = request.params.id;
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var class1 = request.body.class;
    var gender = request.body.gender;
    var physical_address = request.body.physical_address;
    var status = request.body.status;

    var query = `UPDATE students SET first_name ="${first_name}",last_name = "${last_name}",class = "${class1}" , gender = "${gender}", physical_address= "${physical_address}", status ="${status}" WHERE id = "${id}"` ;
    database.query(query,function(error,data){
        if (error)
        {
            throw error;
        }
        else 
        {
            response.redirect('/sample_data');
        }
    });
});

app.use('/sample_data',router);
}
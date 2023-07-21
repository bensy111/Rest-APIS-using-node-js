const mysql = require ('mysql2');

var conn = mysql.createConnection({
    host: 'localhost',
    database : 'school_a',
    user: 'root',
    password: ''
});

conn.connect(function(error){
    if(error)
    {
        throw error;
    }
    else
    {
        console.log('myql database is connected successivley');
    }
});

module.exports = conn;

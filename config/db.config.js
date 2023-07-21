module.exports ={
    HOST: "localhost",
    USER:"root",
    PASSWORD:"",
    DB:"school_a",
    dialect : "mysql",
    pool:{
        //maximum number of coonections to the db pool
        max:5,
        // minimuim connection to the db pool
        min: 0,
        // maximum time, in milliseconds that the db pool tries connect before throwing an error
        aquire:3000,
        // maximum time in milliseconds that a connection can be domant before it closes 
        idle: 10000
    }

}
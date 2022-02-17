const res = require('express/lib/response');
const pool = require('../config/db');

module.exports = {

    //creating user
    
    create:(data,callback) =>{
        pool.query(`INSERT INTO signup(Name,Email,Password,Mobile)VALUES(?,?,?,?)`,  
        [
            data.Name,
            data.Email,
            data.Password, 
            data.Mobile
        ],
        
        (error,result,fields)=>{
            if(error){
                return callback(error)
            }
            
            return callback(null,result)
        }
        );
    },



    //get all users

    getUsers:callback=>{
        pool.query(`select id,Name,Email,Password,Mobile from signup`,
        [],
        (error,result,fields)=>{
            if(error){
               callback(error);
            }
            return callback(null,results);
        });
    },


    //get user by id

    getUserById:(id,callback)=>{
        pool.query(`select id,Name,Email,Mobile from signup where id = ?`,
        [id],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        });
    },


    //get user by email to login

    getUserByEmail:(email,callback)=>{
        pool.query(`select * from signup where email = ?`,
        [email],
        (error,results,fields)=>{
            if(error){
                callback(error);
            }

            return callback(null,results[0]);
        });
    }



};
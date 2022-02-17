const { genSaltSync, hashSync,compareSync } = require('bcryptjs');
const {create,getUserById,getUsers,getUserByEmail} = require('./UserService');
const {sign} = require('jsonwebtoken')



module.exports = {

    //creating user
    
    createUser:async(req,res)=>{
        const userData = req.body;
        console.log('userData',req.body);
        var salt = await genSaltSync(10);
        userData.Password = await hashSync(userData.Password, salt);
        create(userData,(err,result)=>{
            if(err){
                console.log("error :",err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }

            return res.status(200).json({
                success:1,
                data:result
            });    

        });

    },


    //get user by id (for anthing update user ,delete user etc...)

    getUserById:(req,res)=>{
        const id = req.params.id;
        getUserById(id,(err,results)=>{
            
                if(err){
                    console.log(err);
                    return ;
                }
                if(!results){
                    return res.json({
                        success:0,
                        message:"Record not found"
                    });
                }
                return res.json({
                    success:1,
                    data:results
                });
            
        });
    },


    //get users

    getUsers:(req,res)=>{
        getUsers((err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            })
        })
    },


    //login

    login:(req,res)=>{

        const loginData = req.body;
        getUserByEmail(loginData.Email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data:"Invalid email or Password"
                });
            }

            const results = compareSync(loginData.Password,results.Password);
            if(results){
                results.Password = undefined;
                const jsonwebtoken = sign({results:results},'qwe1234',{
                    expiresIn:"1h"
                });

                return res.json({
                    success:1,
                    message:"Login successfully",
                    token:jsonwebtoken
                });
            }else{
                res.json({
                    success:0,
                    data:"Invalid email or Password"
                });
            }
        });
        
    }

    
}
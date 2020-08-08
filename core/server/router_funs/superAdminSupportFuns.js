const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/admin')


const SUPER_ADMIN_TEMP_TOKEN = "superAdminTempToken"

const checkToken = (token) => {
    if(token === SUPER_ADMIN_TEMP_TOKEN)
        return true
    return false
}

const createAdminUser = (req, res) => {
    let authToken = req.body.authToken
    if(!checkToken(authToken)){
        res.status(200).send({status : 1, desc : "authToken Error"})
        return
    }

    if(
        req.body['username'] === undefined || req.body['password'] === undefined ||
        req.body['username'].length < 5 || req.body['password'].length < 5
    ){
        res.status(200).send({status : 1, desc : "invalidRequest"})
        return
    }

    let adminDetails = {
        username : req.body['username'],
        password : req.body['password'],
        district : "*", 
        policeStation : "*"
    }

    Admin.findOne({username: adminDetails.username}).then((admin) => {
        //this was done since unique=true was not workin, no idea y
        if(admin === null){
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    //Salt gen error
                    res.status(200).send({status :1 , desc: err, tinyDesc : 'could not generate salt'})
                }

                bcrypt.hash(req.body.password, salt, function(err, hashedPass) {
                    if(err){
                        //Hashing error
                        res.status(200).send({status :1 , desc: err, tinyDesc : 'unable to hash'})
                    }

                    //If bcrypt success, then save to DB
                    adminDetails['password'] = hashedPass
                    const admin = new Admin(adminDetails)
                    admin.save().then(() => {
                        admin.save().then(() => {
                            res.status(200).send({status : 0, desc : "newUserCreated"})
                        }).catch((error) => {
                            //Unable to save newly generated token
                            res.status(200).send({status : 1, desc : error})
                        })
                    }).catch((error) => {
                        //Unable to save primary data
                        //Unique username violation
                        res.status(200).send({status : 1, desc : "duplicateUsername"})
                    })
                });
            });
        }
        else{
            res.status(200).send({status : 1, desc : "username already taken"})
        }
    }).catch(err=>{
        console.log(err)
    })
}


exports.createAdminUser = createAdminUser
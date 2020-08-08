const jwt = require('jsonwebtoken')
const Incident = require('../models/incident')
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')

const checkToken = (token) => new Promise(function(resolve, reject) {
    jwt.verify(token, 'superSecretKey ;)', function(err, decoded){
        if (err) reject({status : false})
        else resolve({status : true, district : decoded.district, policeStation : decoded.policeStation})
    })
});

const verify = (req, res) => {
    const authToken = req.body.authToken
    checkToken(authToken).then((status)=>{
        res.status(200).send({status : 0})
    }).catch(err => {
        res.status(200).send({status : 1})
    })
}

const login = (req, res) => {
    if(req.body.username == undefined || req.body.password == undefined){
        res.status(200).send({desc: 'Invalid Request', status : 1})
    }

    const username = req.body.username
    Admin.findOne({username: username}).then((admin) => {
        bcrypt.compare(req.body.password, admin.password).then((result) => {
            if(result === true){
                //Login success, generate JWT
                const token = jwt.sign({
                    username: admin.username,
                    district : admin.district,
                    policeStation : admin.policeStation
                }, 'superSecretKey ;)', { expiresIn: '7days' })
                admin['tokens'] = admin['tokens'].concat({token})
                admin.save().then(() => {
                    res.send({token, status:0})
                }).catch((error) => {
                    res.status(200).send({desc: error, tinyDesc : 'mongoDBTokenInsertionError', status : 1})
                })
            }
            else{
                //Wrong password
                res.status(200).send({desc: 'wrongPassword', status : 1})
            }
        }).catch((error) => {
            //Unable to compare password
            res.status(200).send({desc: error, tinyDesc : 'unableToComparePasswords', status : 1})
        })
    }).catch(err=>{res.status(200).send({desc:  err, tinyDesc : 'userNotFound', status : 1})});
}

const getActiveIncidents = (req, res) => {
    let authToken = req.body.authToken
    checkToken(authToken).then((status)=>{  
        if(status.status === false) throw "tokenError"
        let filter = {}
        if(status.district === "*" && status.policeStation === "*"){
            filter = {
                'status' : { $lt: 2},
            }
        }
        else{
            filter = {
                'status' : { $lt: 2},
                'district' : status.district, 'localPoliceStation' : status.policeStation
            }
        }
        Incident.find(filter).then(snapshots=>{
            res.status(200).send({status : 0, desc : snapshots, district : status.district, policeStation : status.policeStation})
        }).catch(err => {
            res.status(200).send({status : 1, desc : err})
        })
    }).catch(err => {
        console.log(err)
        res.status(200).send({status : 1, desc : "authTokenError"})
    })
}

const closeIncident = (req, res) => {
    let authToken = req.body.authToken
    checkToken(authToken).then((status)=>{
        if(status.status === false) throw "tokenError"
        if(req.body['incidentId'] === undefined){
            res.status(200).send({status : 1, desc : "invalidRequest"})
            return
        }
    
        const incidentId = req.body['incidentId']
    
        let updateInfo = {
            status : 2, // mark that this incident is closed
        }
    
        Incident.findByIdAndUpdate({_id: incidentId}, updateInfo).then((data) => {
            if(data){
                console.log("[+] incident closed")
                res.status(200).send({status : 0})
            }
            else{
                console.log("[-] incident update error.")
                res.status(200).send({status : 1, desc : "noSuchIncidentFound"})
            }
        }).catch((error) => {
            console.log("[-] incident update error.")
            res.status(200).send({status : 1, desc : error})
        })
    }).catch(err => {
        res.status(200).send({status : 1, desc : "authToken Error"})
    })
}


const getClosedIncidents = (req, res) => {
    let authToken = req.body.authToken
    checkToken(authToken).then((status)=>{
        if(status.status === false) throw "tokenError"
        let filter = {}
        if(status.district === "*" && status.policeStation === "*"){
            filter = {
                'status' : 2,
            }
        }
        else{
            filter = {
                'status' : 2,
                'district' : status.district, 'localPoliceStation' : status.policeStation
            }
        }
        Incident.find(filter).then(snapshots=>{
            res.status(200).send({status : 0, desc : snapshots, district : status.district, policeStation : status.policeStation})
        }).catch(err => {
            res.status(200).send({status : 1, desc : err})
        })
    }).catch(err => {
        res.status(200).send({status : 1, desc : "authToken Error"})
    })
}


createNewUser = (req, res) => {
    let authToken = req.body.authToken
    checkToken(authToken).then((status)=>{
        if(status.district === "*" && status.policeStation === "*"){
            if(
                req.body['username'] === undefined || req.body['password'] === undefined ||
                req.body['district'] === undefined || req.body['policeStation'] === undefined ||
                req.body['username'].length < 5 || req.body['password'].length < 5
            ){res.status(200).send({status : 1, desc : "invalidRequest"})}
        
            let adminDetails = {
                username : req.body['username'],
                password : req.body['password'],
                district : req.body['district'], 
                policeStation : req.body['policeStation']
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
                    res.status(200).send({status : 1, desc : "usernameAlreadyTaken"})
                }
            }).catch(err=>{
                console.log(err)
                res.status(200).send({status : 1, desc : err})
            })
        }
        else{
            res.status(200).send({status : 1, desc : "permissionDenied"})
        }
    }).catch(err => {
        console.log(err)
        res.status(200).send({status : 1, desc : "authTokenError"})
    })
}

exports.verify = verify
exports.login = login
exports.getActiveIncidents = getActiveIncidents
exports.closeIncident = closeIncident
exports.getClosedIncidents = getClosedIncidents
exports.createNewUser = createNewUser
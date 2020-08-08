// const Hospital = require('../models/hospital')
// const Token = require('../models/token')
// const Department = require('../models/department')
// const crypto = require('../assets/encp-helper')
const jwt = require('jsonwebtoken')
const Incident = require('../models/incident')

const requiredItems = [
    'subject', 'body', 'name', 'phoneNumber', 'aadharNumber', 'vehicleNumber', 'district', 
    'localPoliceStation'
]

const vertifyReqBody = (body) => {
    const keysInBody = Object.keys(body)
    for(var i=0; i<requiredItems.length; i++){
        item = requiredItems[i]
        if(!keysInBody.includes(item) || body[item] === undefined || body[item] === '') {
            console.log(item)
            return false
        }
    }
    return true
}

const reportIncident = (req, res) => {
    let body = req.body
    console.log(body)
    if(!vertifyReqBody(body)){
        res.status(200).send({status : 1, desc : "invalidRequest"})
        return
    }

    let vehicleNumber = body['vehicleNumber'].replace(/\s/g, '')
    var d = new Date();
    var dateTime = d.toLocaleString();
    body['vehicleNumber'] = vehicleNumber
    body['dateTime'] = dateTime
    const incident = new Incident(body)
    incident.save().then((data)=>{
        console.log("[+] Incident Added")
        res.status(200).send({status : 0, desc : {referenceId : data['_id']}})
    }).catch((error) => {
        console.log("[-] Incident Add Failed")
        res.status(200).send({status : 1, desc : error})
    })
}


exports.reportIncident = reportIncident

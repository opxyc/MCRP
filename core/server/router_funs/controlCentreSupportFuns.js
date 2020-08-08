const jwt = require('jsonwebtoken')
const Incident = require('../models/incident')

const AUTHTOKEN = "heWasASimilarBlackPen"

const checkToken = (token) => {
    if(token === AUTHTOKEN) return true
    return false
}

const getActiveIncidents = (req, res) => {
    let authToken = req.body.authToken
    if(!checkToken(authToken)){
        res.status(200).send({status : 1, desc : "authToken Error"})
        return
    }

    Incident.find({'status' : { $lt: 2}},{vehicleNumber:true}).then(snapshots=>{
        res.status(200).send({status : 0, desc : snapshots})
    }).catch(err => {
        res.status(200).send({status : 1, desc : err})
    })
}

const updateCaseFile = (req, res) => {
    let authToken = req.body.authToken
    if(!checkToken(authToken)){
        res.status(200).send({status : 1, desc : "authToken Error"})
        return
    }

    if(req.body['incidentId'] === undefined || req.body['newInfo'] === undefined){
        res.status(200).send({status : 1, desc : "invalidRequest"})
        return
    }

    const incidentId = req.body['incidentId']

    let updateInfo = {
        status : 1, // mark that this incident got atleast one vehicle indentification
    }

    Incident.findById(incidentId).then(incident => {
        let identifications = incident['identifications']
        identifications.push(req.body['newInfo'])
        updateInfo['identifications'] = identifications
        Incident.findByIdAndUpdate({_id: incidentId}, updateInfo).then((data) => {
            console.log("[+] incident updated")
            res.status(200).send({status : 0})
        }).catch((error) => {
            console.log("[-] incident update error.")
            res.status(200).send({status : 1, desc : error})
        })
    }).catch(err => {
        res.status(200).send({status : 1, desc : "noSuchIncidentFound"})
    })
}



exports.getActiveIncidents = getActiveIncidents
exports.updateCaseFile = updateCaseFile
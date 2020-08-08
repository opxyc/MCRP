const router = require('express').Router()
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('./models/mongodb')
const userSupportFuns = require('./router_funs/userSupportFuns')
const superAdminSupportFuns = require('./router_funs/superAdminSupportFuns')
const controlCentreSupportFuns = require('./router_funs/controlCentreSupportFuns')
const policeSupportFuns = require('./router_funs/policeSupportSupportFuns')

/*
MEssage status codes for app:
0 - OK. intented task done
1 - total error
2 - OK. but intented task not done
*/

/*for common users*/
//report a new incident
router.post('/report-incident', (req, res) => userSupportFuns.reportIncident(req, res))
//track incident application status
//to do


/*for control centres*/
//get-active-incidents
router.post('/get-active-incidents', (req, res) => controlCentreSupportFuns.getActiveIncidents(req, res))
//update-case-file
router.post('/update-case-file', (req, res) => controlCentreSupportFuns.updateCaseFile(req, res))

/*super admin*/
//create an admin user
router.post('/create-admin-user', (req, res) => superAdminSupportFuns.createAdminUser(req, res))

/*for police centres*/
//verify authToken
router.post('/verify', (req, res) => policeSupportFuns.verify(req, res))
//login to the system
router.post('/login', (req, res) => policeSupportFuns.login(req, res))
//get-active-incidents-pc
router.post('/get-active-incidents-pc', (req, res) => policeSupportFuns.getActiveIncidents(req, res))
//close-incident
router.post('/close-incident', (req, res) => policeSupportFuns.closeIncident(req, res))
//get-closed-incidents-pc
router.post('/get-closed-incidents-pc', (req, res) => policeSupportFuns.getClosedIncidents(req, res))
//add new user
router.post('/create-new-user', (req, res) => policeSupportFuns.createNewUser(req, res))
module.exports = router

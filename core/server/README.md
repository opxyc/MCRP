## Server
Provides API support for the control centre module and web interface.

```js
/*for common users*/
//report a new incident
POST '/report-incident'

/*for control centres*/
//get-active-incidents
POST '/get-active-incidents'
//update-case-file
POST '/update-case-file'

/*super admin*/
//create an admin user
POST '/create-admin-user'

/*for police centres*/
//verify authToken
POST '/verify'
//login to the system
POST '/login'
//get-active-incidents-pc
POST '/get-active-incidents-pc'
//close-incident
POST '/close-incident'
//get-closed-incidents-pc
POST '/get-closed-incidents-pc'
//add new user -- works only for super admin created using request to /create-admin-user
POST '/create-new-user'
```

`/public` directory is used to serve the front end React over express.

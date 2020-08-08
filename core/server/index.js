const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors({origin: true, credentials: true}))

const routes = require('./routes')
app.use(routes)

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

//const port = process.env.PORT || 8080
const port = 80

app.listen(port,()=>console.log(`Running on port ${port}`))
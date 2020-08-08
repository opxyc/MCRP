//DB Connection script using mongoose
//Used by models

const mongoose = require('mongoose')
const connectionString = "mongodb+srv://user:asswordp@cluster0-7c3yc.mongodb.net/hacKP?retryWrites=true&w=majority"
mongoose.connect( connectionString , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{console.log("connected")}).catch((err)=>{console.log(err);console.log("Failed to start server. Total Error.")})
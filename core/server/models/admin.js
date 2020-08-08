const mongoose = require('mongoose')
const validator = require('validator')

const admin = mongoose.model('admins', {
    username: {
        type: String,
        unique : true,
        trim: true,
        lowercase: true,
        require : true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validator(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    district : {
        type: String,
        trim: true,
        require : true,
    },  
    policeStation : {
        type: String,
        trim: true,
        require : true,
    }, 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = admin
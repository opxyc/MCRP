const mongoose = require('mongoose')

const incident = mongoose.model('incidents', {
    subject: {
        type: String,
        trim: true,
        require : true
    },
    body: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require : true,
        trim: true
    },
    phoneNumber: {
        type: String,
        require : true,
        trim: true
    },
    aadharNumber: {
        type: String,
        trim: true,
        require : true
    },
    vehicleNumber: {
        type: String,
        require : true,
        trim: true
    },
    district : {
        type: String,
        require : true,
        trim: true
    },
    localPoliceStation : {
        type: String,
        require : true,
        trim: true
    },
    dateTime : {
        type: String,
        require : true,
        trim: true
    },
    status : {
        type : Number,
        default : 0,
    },
    identifications : {
        type : [
            { 
                date : {
                    type: String,
                    trim: true
                },
                time : {
                    type: String,
                    trim: true
                },
                location : {
                    type: String,
                    default : "00",
                    trim: true
                },
            }
        ],
        default : []
    }
})

module.exports = incident
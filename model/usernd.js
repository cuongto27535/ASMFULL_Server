const mongoose = require('mongoose')
const useSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
    
},
 {collection:"dsnguoidungs"})


const usernguoidung = mongoose.model('dsnguoidungs', useSchema)
module.exports = usernguoidung
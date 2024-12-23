const mongoose = require('mongoose')

const validateEmail = (email) =>{
    return (/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm).test(email)
}

const userSchema = new mongoose.Schema({
email:{
    type: String,
    unique: true,
    required: 'Valid Email is Required',
    validate: [validateEmail, 'Invalid Email']
},
password:{
    type: String
}
})

module.exports = mongoose.model('User', userSchema)
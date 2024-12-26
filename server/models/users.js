const mongoose = require('mongoose')

const bcrypt = require('bcrypt-nodejs')

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

userSchema.pre('save', function(next){
    const user = this
    if(user.isNew || user.isModified('password')){
        bcrypt.genSalt(10,(error, salt)=>{
            if(error){
                return next(error)
            }
            bcrypt.hash(user.password, salt, null, (error, hash)=>{
                if(error){
                    return next(error)
                }
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
})

userSchema.methods.comparePassword= function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(error, isMatch){
        if (error){
            callback(error)
        }
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)
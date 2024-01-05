const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isLength(value,{min: 2})){
                throw new Error('Name must be at least 2 characters');
            }
        }
        
        // validate: [
        //     { validator: validator.isAlpha, message: "Name should contain only alphabets" },
        //     { validator: !validator.isLength, arguments: { min: 2 }, message: "Name should contain at least 2 alphabets" }
        // ]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        },
        
    },
    location:{
        type: String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isLength(value,{min:6})){
                throw new Error('Password must be of 6 alphanum long')
            }
        }
    },
    date:{
        type:Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("User",UserSchema);
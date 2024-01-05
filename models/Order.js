const mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    order_data:{
        type:Array,
        required:true
    },
    order_date:{
        type:Date,
        default: Date.now()
    }
})

module.exports=new mongoose.model("order",OrderSchema);
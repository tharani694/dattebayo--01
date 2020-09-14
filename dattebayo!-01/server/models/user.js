const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String, 
        required:true 
    },
    password:{ 
        type: String, 
        required: true 
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/maryam694/image/upload/v1589815456/no_image_io1ypj.png"
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
})

mongoose.model("User", userSchema)
const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required: true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comments: [{
      text:String,
      postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    }],
    postedBy:
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
},{timestamps:true})
//const User = mongoose.model('User',userSchema);
mongoose.model("Post", postSchema);
//default:"https://res.cloudinary.com/maryam694/image/upload/v1589815456/no_image_io1ypj.png"
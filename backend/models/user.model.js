import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"default.jpg"
    },
    token: {  // Add this field
        type: String,
        default: ""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

const User=mongoose.model("User",UserSchema);

export default User;
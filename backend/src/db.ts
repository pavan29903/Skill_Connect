import mongoose from "mongoose";


import { model,Schema } from "mongoose";

mongoose.connect('mongodb+srv://ramasatyapavan29903:ramasatyapavan29903@cluster0.sh8l8.mongodb.net/')

const userSchema =  new Schema({
    username:String,
    email : {type: String , unique: true},
    password : String,
    college :String,
    location:String,
    skillSet:String,
})

export const userModel = model("User", userSchema)

// const detailsSchema = new Schema({
//     college :String,
//     location:String,
//     skillSet:String,
//     userid : {type:mongoose.Types.ObjectId , ref:'User' , require :true}
// })

// export const detailsModel = model("Details" , detailsSchema)


const contentSchema = new Schema({
    photo: String,
    description: String,
    userid : {type:mongoose.Types.ObjectId , ref:'User' , require :true}
})

export const contentModel = model('Content' , contentSchema)



// const LinkSchema = new Schema({
//     hash: String,

//     userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
// });

// export const LinkModel = model("Links", LinkSchema);
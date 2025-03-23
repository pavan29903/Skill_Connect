"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect('mongodb+srv://ramasatyapavan29903:ramasatyapavan29903@cluster0.sh8l8.mongodb.net/');
const userSchema = new mongoose_2.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    college: String,
    location: String,
    skillSet: String,
});
exports.userModel = (0, mongoose_2.model)("User", userSchema);
// const detailsSchema = new Schema({
//     college :String,
//     location:String,
//     skillSet:String,
//     userid : {type:mongoose.Types.ObjectId , ref:'User' , require :true}
// })
// export const detailsModel = model("Details" , detailsSchema)
const contentSchema = new mongoose_2.Schema({
    photo: String,
    description: String,
    userid: { type: mongoose_1.default.Types.ObjectId, ref: 'User', require: true }
});
exports.contentModel = (0, mongoose_2.model)('Content', contentSchema);
// const LinkSchema = new Schema({
//     hash: String,
//     userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
// });
// export const LinkModel = model("Links", LinkSchema);

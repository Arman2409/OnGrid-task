import mongoose from "../backend/database.js";

var Schema = mongoose.Schema;

const User = new Schema({
    email:{type: String, required: true},
    password:{type: String, required: true},
});

const UserModel = mongoose.model("users",User);

export default UserModel;
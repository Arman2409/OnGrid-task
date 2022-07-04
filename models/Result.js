import mongoose from "../backend/database.js";

var Schema = mongoose.Schema;

const Result = new Schema({
    email:{type: String, required: true},
    result: {type: String, required: true},
});

const ResultModel = mongoose.model("results", Result);

export default ResultModel;
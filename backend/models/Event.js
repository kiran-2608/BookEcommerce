const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

date:{
type:String,
required:true
},

time:{
type:String,
required:true
},

location:{
type:String,
required:true
},

registered:{
type:Number,
default:0
},

image:{
type:String,
required:true
},

description:{
type:String,
required:true
}

});

module.exports =
mongoose.model(
"Event",
eventSchema
);
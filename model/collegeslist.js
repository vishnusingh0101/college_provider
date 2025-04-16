const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegesSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    university: { type: String, required: true },
    imgLink: { type: String },
    established: { type: Number }, 
    area: { type: Number },       
    naacGrade: { type: String }, 
    description: { type: String },
    mapLink: { type: String },
    address: { type: String }
});

module.exports = mongoose.model('colleges', collegesSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    Name: { type: String, required: true, trim: true },
    Profile: { type: String, required: true, trim: true },
    College: { type: String, trim: true },
    Bio: { type: String, trim: true },
    Expertise: { type: String, trim: true },
    Description: { type: String, trim: true },
    MobileNumber: { type: String, trim: true },
    Mail: { type: String, trim: true, lowercase: true}
}, { timestamps: true });

module.exports = mongoose.model('studentlist', StudentSchema);
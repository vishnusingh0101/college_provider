const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, required: true, trim: true },
    profile: { type: String, required: true, trim: true },
    college: { type: String, trim: true },
    course: { type: String, trim: true },
    bio: { type: String, trim: true },
    expertise: { type: String, trim: true },
    description: { type: String, trim: true },
    mobilenumber: { type: String, trim: true },
    mail: { type: String, trim: true, lowercase: true }
}, { timestamps: true });

module.exports = mongoose.model('studentlist', StudentSchema);

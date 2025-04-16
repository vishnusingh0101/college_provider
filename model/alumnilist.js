const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumniSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: String,
        trim: true,
        default: ''
    },
    college: {
        type: String,
        trim: true,
        default: ''
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    expertise: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    currentcompany: {
        type: String,
        trim: true,
        default: ''
    },
    joblocation: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    mail: {
        type: String,
        trim: true,
        lowercase: true,
        default: '',
        validate: {
            validator: function(v) {
                // Allow empty or valid email
                return v === '' || /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    }
}, { timestamps: true });

alumniSchema.pre('save', function(next) {
    if (this.phone && typeof this.phone === 'string') {
        this.phone = this.phone.replace(/\D/g, ''); 
    }
    next();
});

module.exports = mongoose.model('alumni', alumniSchema);
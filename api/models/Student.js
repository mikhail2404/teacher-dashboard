const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    group: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;
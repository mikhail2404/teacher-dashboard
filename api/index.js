const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const DashboardModel = require("./models/Dashboard");
const StudentModel = require("./models/Student");

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))
app.get('/api/dashboard', async (req, res)=>{
    try {
        const dashboardData = await DashboardModel.find();
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/api/students', async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/students/:id', async (req, res) => {

    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Update the fields of the student object with the request body
        student.firstName = req.body.firstName || student.firstName;
        student.lastName = req.body.lastName || student.lastName;
        student.group = req.body.group || student.group;
        student.subject = req.body.subject || student.subject;
        student.points = req.body.points || student.points;

        // Save the updated student object to the database
        const updatedStudent = await student.save();

        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/students/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const deletedStudent = await StudentModel.findByIdAndRemove(id);
        if (!deletedStudent) {
            return res.status(404).send({ error: `Student with ID ${id} not found` });
        }
        res.send(deletedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.post('/api/students', async (req, res) => {
    try {
        const { firstName, lastName, group, subject, points } = req.body;

        const newStudent = new StudentModel({
            firstName,
            lastName,
            group,
            subject,
            points,
        });

        const createdStudent = await newStudent.save();

        res.status(201).json(createdStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


if (process.env.API_PORT) {
    app.listen(process.env.API_PORT);
}

module.exports = app;
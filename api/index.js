const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

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

if (process.env.API_PORT) {
    app.listen(process.env.API_PORT);
}

module.exports = app;
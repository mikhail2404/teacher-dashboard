const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port 
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//import routes
const DashboardModel = require("./models/Dashboard");
const StudentModel = require("./models/Student");


//connect to mongodb ..
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.get('/test/dashboard', async (req, res)=>{
    try {
        const dashboardData = await DashboardModel.find();
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/test/students', async (req, res) => {
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


//connect to server
app.listen(PORT, ()=> console.log("Server connected") );

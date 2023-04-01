const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port 

//use cors
app.use(cors());

//import routes
const DashboardModel = require("./models/Dashboard");
const StudentModel = require("./models/Student");


//connect to mongodb ..
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.get('/api/dashboard', async (req, res)=>{
    res.json('hello world 2 '+Date.now());

    // try {
    //     const dashboardData = await DashboardModel.find();
    //     res.json(dashboardData);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
})

// app.get('/api/students', async (req, res) => {
//     try {
//         const students = await StudentModel.find();
//         res.json(students);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


if (process.env.API_PORT) {
    app.listen(process.env.API_PORT);
}


//connect to server

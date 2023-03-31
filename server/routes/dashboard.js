const router = require('express').Router();
const DashboardModel = require('../models/Dashboard');



router.get('/dashboard', async (req, res)=>{
    try {
        const dashboardData = await DashboardModel.find();
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})




module.exports = router;
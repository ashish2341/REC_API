const express = require('express');
const authRoutes = require('./authRoute');
const aminityRoutes = require('./aminityRoute');


const allRouters = express.Router();


allRouters.use("/auth", authRoutes);
allRouters.use("/aminity", aminityRoutes);

module.exports =  allRouters;
const express = require('express');
const authRoutes = require('./authRoute');
const aminityRoutes = require('./aminityRoute');
const featureRoutes = require('./featuresRoute')


const allRouters = express.Router();


allRouters.use("/auth", authRoutes);
allRouters.use("/aminity", aminityRoutes);
allRouters.use("/feature",featureRoutes);

module.exports =  allRouters;
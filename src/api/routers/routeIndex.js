const express = require('express');
const authRoutes = require('./authRoute');
const aminityRoutes = require('./aminityRoute');
const roleRoutes = require('./roleRoute');
const featureRoutes = require('./featuresRoute');
const dbMasters = require('./dbMasterRoute')


const allRouters = express.Router();


allRouters.use("/auth", authRoutes);
allRouters.use("/aminity", aminityRoutes);
allRouters.use("/role", roleRoutes);
allRouters.use("/feature",featureRoutes);
allRouters.use('/masters',dbMasters)

module.exports =  allRouters;
const express = require('express');
const app = express();
let cors = require("cors");
const allRouters = require('./api/routers/routeIndex');
const { errorConverter, errorHandler } = require('./helper/errorHandler');
 
 

// db 
require('./db/db')

app.use(express.json());
app.use(cors());

//routes
app.use("/v1",allRouters);
 
app.use(errorConverter);

app.use(errorHandler);
 


 
 
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






 

 
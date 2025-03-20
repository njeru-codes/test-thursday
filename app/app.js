require("dotenv").config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const oas = require("express-oas-generator");
const auth_documentation = require('./middleware/documentation')
const { requestLogger} = require('./middleware/logger');
const  authMiddleware = require('./middleware/authMiddleware');
const router = require('./routes/index')
const connectDB =require('./db/db')

const app = express();

// configurations
app.disable('x-powered-by')
oas.init(app, {}); // Auto-generates Swagger UI documentation from routes
const port = process.env.PORT  || 3000

//connect to database
connectDB();


// middlewares
app.use(helmet());
app.use(express.json());
app.use('/api-docs', auth_documentation)  //protect swagger-docs with Basic Auth
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);  //log all requests(in and out)


// add authentication to routes
app.use('/comments', authMiddleware)



//routes
app.use('', router)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
    console.log('swaagger documentation is available at /api-docs')
})
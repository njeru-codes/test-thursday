require("dotenv").config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const oas = require("express-oas-generator");
const auth_documentation = require('./middleware/documentation')
const { requestLogger} = require('./middleware/logger');
const  authMiddleware = require('./middleware/authMiddleware');
const swaggerUi = require("swagger-ui-express");
const router = require('./routes/index')
const connectDB =require('./db/db')
const cors = require("cors");

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

app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);  //log all requests(in and out)
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"] }));

// app.use('/api-docs', auth_documentation)  //protect swagger-docs with Basic Auth
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));


app.get("/test", (req, res) => {
    res.json({ message: "CORS is enabled!" });
});


// add authentication to routes
app.use('/comments', authMiddleware)






//routes
app.use('/', router)



app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});

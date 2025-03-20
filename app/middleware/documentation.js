require("dotenv").config();
const basicAuth = require("express-basic-auth");

const username = process.env.DOCUMENTATION_USERNAME;
const password = process.env.DOCUMENTATION_PASSWORD;



const auth_documentation = basicAuth({
    users: { [username]: password }, 
    challenge: true,
    unauthorizedResponse: "Unauthorized access to API docs",
});

module.exports = auth_documentation;

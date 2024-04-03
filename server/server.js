const express = require("express")
const config = require("./config/config")
require("./config/db_connect")
const { auth_route, user_route } = require("./routes")
const error_handler = require("./utils/error-handler")

const app = express();

app.use(express.json());
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/user", user_route);

app.use(error_handler);

app.listen(config.PORT, ()=>{
    console.log(`Server listening on port ${config.PORT}`)
})
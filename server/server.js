const express = require("express")
const config = require("./config/config")
require("./config/db_connect")
const path = require("path")
const { auth_route, user_route, stage_route } = require("./routes")
const error_handler = require("./utils/error-handler")
const { authMiddleware, checkBanMiddleware } = require("./middlewares")
const { initAdminAccount } = require("./utils")


const app = express();
initAdminAccount();
/* static files */
app.use('/static/images', express.static(path.join(__dirname, './files/images')))
app.use('/static/files', express.static(path.join(__dirname, './files/uploads')))

app.use(express.json());
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/users", authMiddleware, checkBanMiddleware, user_route);
app.use("/api/v1/stages", authMiddleware, checkBanMiddleware, stage_route);
//error handler
app.use(error_handler);


app.listen(config.PORT, ()=>{
    console.log(`Server listening on port ${config.PORT}`)
})
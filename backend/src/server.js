require("dotenv").config()
const express = require("express")
const configViewEngine = require("./config/viewEngine")
const routes = require("./routes/web")
const api = require("./routes/api")
const cors = require('cors');

const app = express()

configViewEngine(app)

const port = process.env.PORT
const host = process.env.HOST_NAME

app.use(cors())

app.use("/", routes)
app.use("/api/ver1/", api)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
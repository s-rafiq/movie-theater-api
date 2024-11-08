const express = require("express");
const userRouter = require("./routes/userRouter")
const showRouter = require("./routes/showRouter")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(userRouter)
app.use(showRouter)








module.exports = app
const express = require('express')
// var bodyParser = require('body-parser');
const helmet = require('helmet')
const cors = require("cors")
require('dotenv').config()
const auth = require('./app/middlewares/auth')

const app = express()

//Middlewares
app.use(express.json());
app.use(helmet())
app.use(cors())

//Database init
require('./app/db')()

app.get("/", (req, res) => {
    res.send("Hello DemoApp")
})

//Import routes
const postsRoutes = require('./app/routes/posts')
const authRoutes = require('./app/routes/auth')


//Routes Middleware 
app.use("/posts", auth, postsRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`${process.env.APP_NAME} listening on port ${PORT}!`))
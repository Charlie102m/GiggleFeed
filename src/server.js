const path = require('path')
const express = require('express')
const app = express()
const colors = require('colors')
const { connectDb } = require('./config/db.js')

// development
if (process.env.NODE_ENV === 'development') {
    const dotenv = require('dotenv').config({ path: __dirname + '/config/.env' })
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// config
app.use(express.json())
connectDb()

// routers
const AuthRouter = require('./routes/AuthRoutes.js')
const JokeRouter = require('./routes/JokeRoutes.js')

app.use('/api/auth', AuthRouter)
app.use('/api/joke', JokeRouter)

// error handler
const errorHandler = require('./middleware/error.js')
app.use(errorHandler)

// seeder
// const { seedDB } = require('./utils/seeder.js')
// setInterval(() => { seedDB() }, 2500);

app.listen(process.env.PORT || 5000, () => console.log(`SERVER RUNNING ON PORT : ${process.env.PORT || 5000}`.bold.yellow))
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

// seeder
const { seedDB } = require('./utils/seeder.js')
setInterval(() => { seedDB() }, 5000);

app.listen(process.env.PORT || 5000, () => console.log(`SERVER RUNNING ON PORT : ${process.env.PORT || 5000}`.bold.yellow))
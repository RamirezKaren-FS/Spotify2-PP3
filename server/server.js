const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
// const path = require('path')
const cors = require('cors')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/users')
const spotifyRouter = require('./routes/spotfy')

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Database Connection is Established"))

app.use(express.json())
app.use('/users', userRouter)
app.use('/access', spotifyRouter)

app.listen(() => {
    console.log(`Server running on port ${PORT}`)
})
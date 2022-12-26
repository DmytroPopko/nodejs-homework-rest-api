const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const authRouter = require("./routes/api/auth")
const contactsRouter = require('./routes/api/contacts')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const {DB_HOST} = process.env;
console.log(DB_HOST);
mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch(error => console.log(error.message))

  const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

const mongoose = require('mongoose')
const app = require('./app')

mongoose.set("strictQuery", true); 

app.listen(3001, () => {
  console.log("Server running. Use our API on port: 3001")
})

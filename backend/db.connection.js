const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)    
    console.log(`Connected to DB`)
  } catch (error) {
    console.log(error)
  }
}

module.exports =  dbConnection
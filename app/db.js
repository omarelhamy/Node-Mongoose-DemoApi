const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set("useFindAndModify", false)
    mongoose.connect(process.env.DB_CONNECTION_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

    mongoose.connection.on('error', (error) => console.error(error))
    mongoose.connection.on('connected', () => console.log("Connected to DB!"))
    mongoose.connection.on('disconnected', () => console.log("Disconnected from DB!"))

    process.on("SIGINT", () => {
        mongoose.connection.close(() => { console.log("Mongoose disconnected due to app termination."); process.exit(0) });
    })
}
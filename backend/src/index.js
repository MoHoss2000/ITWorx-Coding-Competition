const express = require('express')
require('./db/mysql')

const app = express()

const employeeRouter = require('./routes/employee')
const generalRouter = require('./routes/general')
const leaderboardRouter = require('./routes/leaderboard')

app.use('/leaderboard', leaderboardRouter)
app.use(employeeRouter)
app.use(generalRouter)

const db = require("./models");
//built-in middleware function in Express. It parses incoming requests with JSON 
app.use(express.json());

db.sequelize.sync().then(() => {
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
    
});

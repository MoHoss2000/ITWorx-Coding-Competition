const express = require('express')
require('dotenv').config()
require('./db/mysql')

const app = express()
const employeeRouter = require('./routes/employee')
const generalRouter = require('./routes/general')
const leaderboardRouter = require('./routes/leaderboard')
const {Employee, Cycle, Admin, EmployeeActivity} = require('./models/index')

app.use('/leaderboard', leaderboardRouter)
app.use('/employee', employeeRouter)
app.use(generalRouter)


const db = require("./models");
//built-in middleware function in Express. It parses incoming requests with JSON 
app.use(express.json());

db.sequelize.sync().then(() => {
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
});

// Used to insert dummy records in the database

//let i = 1
// const insert = async () => {
//   while(i++ <= 5){
//     console.log(i)
//     await EmployeeActivity.create({
//       isComplete: true,
//       date_of_completion: '2020/10/10',
//       EmployeeId: i%2 + 3,
//       ActivityId: i%2 + 3
//     }).catch((e) => console.log(e))
//   }
// }
//setTimeout(insert, 10000)
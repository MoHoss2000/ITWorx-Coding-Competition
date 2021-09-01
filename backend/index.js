const express = require('express')
require('dotenv').config()
require('./db/mysql')

const app = express();

const employeeRouter = require('./routes/employee')
const generalRouter = require('./routes/general')
const leaderboardRouter = require('./routes/leaderboard')
const adminRouter = require('./routes/admin')

app.use('/', generalRouter)
app.use('/employee', employeeRouter)
app.use('/admin', adminRouter)
app.use('/leaderboard', leaderboardRouter)


//built-in middleware function in Express. It parses incoming requests with JSON 
app.use(express.json());

app.listen(3000, () => console.log('app running on port 3000'))

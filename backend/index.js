const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db/mysql')

const app = express();

app.use(cors({origin: ['http://localhost:3000']}));
const employeeRouter = require('./routes/employee')
const generalRouter = require('./routes/general')
const leaderboardRouter = require('./routes/leaderboard')
const adminRouter = require('./routes/admin')


app.use(express.json())
app.use('/employee', employeeRouter)
app.use('/admin', adminRouter)
app.use('/leaderboard', leaderboardRouter)
app.use('/', generalRouter)



//built-in middleware function in Express. It parses incoming requests with JSON 
app.use(express.json());

app.listen(3001, () => console.log('app running on port 3001'))

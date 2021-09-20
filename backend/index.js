const express = require('express')
const cors = require('cors')
var cron = require('node-cron');
const db = require('./db/mysql')
require('dotenv').config()
require('./db/mysql')
const app = express();
app.use(cors({origin: ['http://localhost:3000']}));
app.use(cors());
const employeeRouter = require('./routes/employee')
const generalRouter = require('./routes/general')
const leaderboardRouter = require('./routes/leaderboard')
const adminRouter = require('./routes/admin')

cron.schedule('0 0 0 * * *', () => {
    console.log('running a task every minute');

    db.query('CALL updateCycle(@stat); select @stat AS status;',(err, result) => {
        if(result){
           console.log(result)
      
          }
        else{
            console.log(err)
        }
    })
});

app.use(express.json())
app.use('/employee', employeeRouter)
app.use('/admin', adminRouter)
app.use('/leaderboard', leaderboardRouter)
app.use('/', generalRouter)

app.listen(3001, () => console.log('app running on port 3001'))

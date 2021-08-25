const express = require('express')
const employeeRouter = require('./routes/employee')
require('./db/mysql')

const app = express()
app.use(employeeRouter)
app.use(express.json())

app.listen(3000, () => console.log('Serever running on port 3000'))
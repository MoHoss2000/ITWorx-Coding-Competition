const viewCompletedTasks = (empID) =>
`SELECT A.* 
FROM employee E INNER JOIN employeeActivity EA ON E.id = EA.EmployeeId 
                INNER JOIN activity A ON A.id = EA.ActivityId
WHERE E.id = ${empID} AND EA.isComplete = TRUE`;

const viewEmployeeCycles = (empID) => 
`SELECT C.*
FROM employeeActivity EA INNER JOIN activity A ON EA.ActivityId = A.id
                         INNER JOIN cycle C ON C.id = A.CycleId
WHERE EA.EmployeeId = ${empID}`;



module.exports = { viewCompletedTasks, viewEmployeeCycles }
const { Employee, Cycle , EmployeeCycle, EmployeeBadge} = require('../models');



exports.viewCompletedTasks = (empID) =>
`SELECT A.* 
FROM employee E INNER JOIN employeeActivity EA ON E.id = EA.EmployeeId 
                INNER JOIN activity A ON A.id = EA.ActivityId
WHERE E.id = ${empID} AND EA.isComplete = TRUE`;

exports.viewEmployeeCycles = (empID) => 
`SELECT C.*
FROM employeeActivity EA INNER JOIN activity A ON EA.ActivityId = A.id
                         INNER JOIN cycle C ON C.id = A.CycleId
WHERE EA.EmployeeId = ${empID}`;


exports.viewEmployeeBadges = (empID) => 
`SELECT  EB.date_acquired, B.*
FROM
employee E INNER JOIN employeeBadge EB ON E.id = EB.employeeId 
           INNER JOIN badge B ON B.id = EB.bageI
WHERE E.id = ${empID}`;

exports.viewEmployeePersonalInfo = (empID) =>
`SELECT E.first_name, E.last_name, E.username, E.is_developer
FROM employee E 
WHERE E.id = ${empID}`;

exports.viewEmployeeDepartment = (empID) =>
`SELECT D.name FROM
department D INNER JOIN employeeDepartment ED ON D.id = ED.DepartmentId
             INNER JOIN employee E ON E.id = ED.EmployeeId
WHERE E.id = ${empID}`; 

exports.viewEmployeePractice = (empID) =>
`SELECT P.name FROM
practice P INNER JOIN employeePractice EP ON P.id = EP.PracticeId
             INNER JOIN employee E ON E.id = EP.EmployeeId
WHERE E.id = ${empID}`;

exports.viewPracticeRank = (cycleID) =>
`SELECT P.name , SUM(a.points) AS TotalPoints FROM
Cycle C INNER JOIN Activity A ON A.CycleId = C.id
		INNER JOIN EmployeeActivity EA ON EA.ActivityId = A.id
        INNER JOIN EmployeePractice EP ON EP.EmployeeId = EA.EmployeeId
        INNER JOIN Practice P ON P.id = EP.PracticeId
WHERE  EA.isComplete = true AND C.id = ${cycleID}
GROUP BY P.name`;


// exports.viewCycleDetailsForEmployee = async (empID, cycleID) => 
// await Employee.findAll({
//     where: {id: empID},
//     include:{
//         // How do you join Employee & Activity? No common column
//         model: Activity,
//         required: true,
//         include: {model: Cycle, required: true, where: {id: cycleID }}
//     },
// })

exports.viewEmployeesInCycle = async (cycleId) => 
    await Employee.findAll({
        attributes: ['id', 'first_name', 'last_name', 'username', 'is_developer'],
        include: { model: Cycle, where: { id: cycleId }, required: true, attributes: [] }
    })

exports.viewCycleActivities = async (cycleId) =>
    await Cycle.findAll({
        where: { id: cycleId },
        include: {Activity},
    })

exports.EmployeeinCycle = async (empID, cycleID) => 
await Employee.findOne({
    where: {id: empID},
    include:{
        model: EmployeeCycle,
        required: true,
        include: {model: Cycle, required: true, where: {id: cycleID }}
    },
})

exports.viewEmployeeCycleVirtualRecognition = async (empId, cycleId) => {
    // all virtual recognition earned by an employee in a cycle
    await Activity.findOne({
        attributes: ['virtual_recognition'],
        where: {CycleId: cycleId, virtual_recognition:1},
        include:{   
            model: EmployeeActivity,
            where: {id: EmployeeId , isComplete:1}} 
    })
}

exports.viewEmployeeCycleBadges = async (empId, cycleId) => {
    // all badges earned by an employee in a cycle
    await EmployeeBadge.findOne({
        where: {EmployeeId: empId, CycleId: cycleId},
        include:{   
            model: Badge,
            where: {BadgeId: id }} 
    })
}

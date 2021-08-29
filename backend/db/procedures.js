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


const viewEmployeeBadges = (empID) => 
`SELECT  EB.date_acquired, B.*
FROM
employee E INNER JOIN employeeBadge EB ON E.id = EB.employeeId 
           INNER JOIN badge B ON B.id = EB.bageI
WHERE E.id = ${empID}`;

const viewEmployeePersonalInfo = (empID) =>
`SELECT E.first_name, E.last_name, E.username, E.is_developer
FROM employee E 
WHERE E.id = ${empID}`;

const viewEmployeeDepartment = (empID) =>
`SELECT D.name FROM
department D INNER JOIN employeeDepartment ED ON D.id = ED.DepartmentId
             INNER JOIN employee E ON E.id = ED.EmployeeId
WHERE E.id = ${empID}`; 

const viewEmployeePractice = (empID) =>
`SELECT P.name FROM
practice P INNER JOIN employeePractice EP ON P.id = EP.PracticeId
             INNER JOIN employee E ON E.id = EP.EmployeeId
WHERE E.id = ${empID}`;

const viewPracticeRank = (cycleID) =>
`SELECT P.name , SUM(a.points) AS TotalPoints FROM
Cycle C INNER JOIN Activity A ON A.CycleId = C.id
		INNER JOIN EmployeeActivity EA ON EA.ActivityId = A.id
        INNER JOIN EmployeePractice EP ON EP.EmployeeId = EA.EmployeeId
        INNER JOIN Practice P ON P.id = EP.PracticeId
WHERE  EA.isComplete = true AND C.id = ${cycleID}
GROUP BY P.name`;

const viewCycleDetailsForEmployee = (empID, cycleID) => 
`SELECT EA.* FROM
activity A INNER JOIN employeeActivity EA ON A.id = EA.ActivityId
           INNER JOIN cycle C ON C.id = A.CycleId
WHERE C.id = ${cycleID} AND EA.EmployeeId = ${empID}`;



module.exports = {
    viewCompletedTasks,
    viewEmployeeCycles,
    viewEmployeeBadges,
    viewEmployeePersonalInfo,
    viewEmployeeDepartment,
    viewEmployeePractice,
    viewPracticeRank,
    viewCycleDetailsForEmployee,
}

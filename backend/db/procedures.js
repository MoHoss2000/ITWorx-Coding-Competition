const  sequelize = require('../db/mysql')
const Sequelize = require('sequelize')
const { Employee, Cycle, EmployeeBadge, Activity, Badge, Department, Practice } = require('../models');

exports.viewCompletedTasks = async (empID, cycleID) => 
    await Activity.findAll({
        where: {CycleId: cycleID},
        include: {
            model: Employee,
            required: true,
            where: {id: empID},
            attributes: [],
            through: {
                where: {status: 'completed'}
            }
        }
})

exports.viewPendingTasks = async (empID) => 
    await Activity.findAll({
        include: {
            model: Employee,
            required: true,
            where: {id: empID},
            attributes: [],
            through: {
                where: {status: 'pending'}
            }
        }
})

exports.viewToBeSubmittedTasks = async (empID) => 
    await Activity.findAll({
        include: {
            model: Employee,
            required: true,
            where: {id: empID},
            attributes: [],
            through: {
                where: {status: 'inProgress'}
            }
        }
    })

exports.viewEmployeeCycles = async (empID) => 
    await Cycle.findAll({
        include:{
            model: Employee,
            required: true,
            where: {id: empID},
            attributes: [],
        }
    })

exports.viewemployeeBadges = async (empID) =>
    await Badge.findAll({
        include: {
            model: Employee,
            required: true,
            where: {id: empID},
            attributes: [],
        }
    })

exports.viewEmployeePersonalInfo = async (empID) =>
    await Employee.findOne({
        where: {id: empID},
        attributes: ['first_name', 'last_name', 'username', 'is_developer']
    })

exports.viewEmployeeDepartments = (empID) =>
    Department.findAll({
        include: {
            model: Employee,
            where: {id: empID},
            required: true,
            attributes: []
        }
    })


exports.viewEmployeePractice = async (empID) =>
    Practice.findAll({
        include: {
            model: Employee,
            required: true,
            attributes: [],
            where: {id: empID}
        }
    })

exports.viewPracticeRank = (cycleID) =>
`SELECT P.name , SUM(a.points) AS TotalPoints FROM
Cycle C INNER JOIN Activity A ON A.CycleId = C.id
		INNER JOIN EmployeeActivity EA ON EA.ActivityId = A.id
        INNER JOIN EmployeePractice EP ON EP.EmployeeId = EA.EmployeeId
        INNER JOIN Practice P ON P.id = EP.PracticeId
WHERE  EA.isComplete = true AND C.id = ${cycleID}
GROUP BY P.name`;

exports.viewCycleDetailsForEmployee = async (empID, cycleID) => 
await Employee.findOne({
    where: {id: empID},
    include:{
        model: Activity,
        required: true,
        include: { model: Cycle, required: true, where: {id: cycleID}, attributes: [] }
    },
})

exports.viewEmployeesInCycle = async (cycleId) => 
    await Employee.findAll({
        attributes: ['id', 'first_name', 'last_name', 'username', 'is_developer'],
        include: { model: Cycle, where: { id: cycleId }, required: true, attributes: [] }
    })

exports.viewCycleActivities = async (cycleId) => {
    await Cycle.findAll({
        where: { id: cycleId },
        include: { Activity },

    })
}

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
        where: {CycleId: cycleId, virtual_recognition: 1},
        include:{   
            model: EmployeeActivity,
            where: {id: empId , isComplete:1}} 
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

exports.viewCompletedActivities = async (empId) => {
    await Activity.findOne({
        include:{   
            model: Employee,
            where: {id: empId , isComplete:1}} 
    })
}

exports.viewmployeeBadges = async (empId) =>{
     // all badges earned by an employee in a cycle
     await EmployeeBadge.findOne({
        where: {EmployeeId: empId},
        include:{   
            model: Badge,
            where: {BadgeId: id }} 
    })
}

exports.viewEmployeVirtualRecognition = async (empId) => {
    // all virtual recognition earned by an employee
    await Activity.findOne({
        attributes: ['virtual_recognition'],
        where: {virtual_recognition:1},
        include:{   
            model: Employee,
            where: {id: EmployeeId , isComplete:1}} 
    })
}

exports.totalGainedPoints = async (empId) => {
    // all points earned by an employee
    await Activity.findAll({
        attributes: ['points'],
        include:{   
            model: Employee,
            where: {id: empId , isComplete:1}} 
    })
}
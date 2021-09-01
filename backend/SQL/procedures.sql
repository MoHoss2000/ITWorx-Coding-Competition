DELIMITER //
CREATE PROCEDURE viewCompletedTasks (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT * FROM
    employeeActivityCycle EAC INNER JOIN Activity A ON EAC.activity_id = A.id
    WHERE EAC.employee_id = employeeID AND EAC.cycle_id = cycleID AND A.status = 'completed';
END //

DELIMITER //
CREATE PROCEDURE viewPendingTasks (IN employeeID INT)
BEGIN
	SELECT * FROM
    employeeActivityCycle EAC INNER JOIN Activity A ON EAC.activity_id = A.id
    WHERE EAC.employee_id = employeeID AND A.status = 'pending';
END //

DELIMITER //
CREATE PROCEDURE viewToBeSubmittedTasks (IN employeeID INT)
BEGIN
	SELECT * FROM
    employeeActivityCycle EAC INNER JOIN Activity A ON EAC.activity_id = A.id
    WHERE EAC.employee_id = employeeID AND A.status = 'inProgress';
END //

DELIMITER //
CREATE PROCEDURE viewEmployeeCycles (IN employeeID INT)
BEGIN
	SELECT C.* FROM
    cycle C INNER JOIN employeeCycle EC ON C.id = EC.cycle_id
    WHERE EC.employee_id = employeeID;
END //

DELIMITER //
CREATE PROCEDURE viewEmployeeBadges (IN employeeID INT)
BEGIN
	SELECT B.* FROM
    badge B INNER JOIN employeeBadgeCycle EBC ON B.id = EBC.badge_id
    WHERE EBC.employee_id = employeeID;
END //


DELIMITER //
CREATE PROCEDURE viewEmployeePersonalInfo (IN employeeID INT)
BEGIN
	SELECT E.id, E.first_name, E.last_name, E.username, E.is_developer
    FROM Employee E
    WHERE E.id = employeeID;
END //

DELIMITER //
CREATE PROCEDURE viewEmployeeDepartments (IN employeeID INT)
BEGIN
	SELECT D.* FROM 
    department D INNER JOIN employeeDepartment ED ON D.id = ED.department_id
    WHERE ED.employee_id = employeeID;
END //

DELIMITER //
CREATE PROCEDURE viewEmployeePractice (IN employeeID INT)
BEGIN
	SELECT P.* FROM 
    Practice P INNER JOIN employeePractice EP ON P.id = EP.practice_id
    WHERE EP.employee_id = employeeID;
END //

DELIMITER //
CREATE PROCEDURE viewPracticeRank (IN cycleID INT)
BEGIN
	SELECT P.name, P.no_of_employees, SUM(A.points) AS TotalPoints FROM
	EmployeeActivityCycle EAC INNER JOIN EmployeePractice EP ON EP.employee_id = EAC.employee_id
							  INNER JOIN Practice P ON P.id = EP.practice_id
                              INNER JOIN Activity A ON A.id = EAC.activity_id
	WHERE EAC.cycle_id = cycleID AND EAC.status = "completed"
	GROUP BY P.name;
END //


DELIMITER //
CREATE PROCEDURE viewCycleDetailsForEmployee (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT A.* FROM
    employeeactivitycycle EAC INNER JOIN Activity A ON EAC.activity_id = A.id
    WHERE EAC.employee_id = employeeID AND EAC.cycle_id = cycleID;
END //

DELIMITER //
CREATE PROCEDURE viewEmployeesInCycle (IN cycleID INT)
BEGIN
	SELECT E.id, E.first_name, E.last_name, E.username, E.is_developer FROM
    EmployeeCycle EC INNER JOIN Employee E ON EC.employee_id = E.id
    WHERE EC.cycle_id = cycleID;
END //


DELIMITER //
CREATE PROCEDURE viewEmployeeActivitiesInCycle (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT A.*, EAC.status, EAC.date_of_completion FROM
    employeeactivitycycle EAC INNER JOIN activity A ON A.id = EAC.activity_id
    WHERE EAC.employee_id = employeeID AND EAC.cycle_id = cycleID;
END //


DELIMITER //
CREATE PROCEDURE viewEmployeeCycleVirtualRecognition (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT A.* FROM
    EmployeeActivityCycle EAC INNER JOIN Activity A ON EAC.activity_id = A.id
    WHERE EAC.employee_id = employeeID AND EAC.cycle_id = cycleID AND EAC.status = "completed" AND A.virtual_recognition = TRUE;
END //


DELIMITER //
CREATE PROCEDURE viewEmployeeCycleBadges (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT B.* FROM
    employeebadgecycle EBC INNER JOIN badge B ON EBC.badge_id = B.id
    WHERE EBC.employee_id = employeeID AND EBC.cycle_id = cycleID;
END //


DELIMITER //
CREATE PROCEDURE viewAllVirtualRecognitions (IN employeeID INT)
BEGIN
	SELECT A.*
    FROM employeeactivitycycle EAC INNER JOIN activity A ON A.id = EAC.activity_id
    WHERE EAC.status = "completed" AND EAC.employee_id = employeeID AND A.virtual_recognition = TRUE;
END //

DELIMITER //
CREATE PROCEDURE totalGainedPoints (IN employeeID INT)
BEGIN
	SELECT SUM(A.points * EAC.quantity)
    FROM employeeactivitycycle EAC INNER JOIN activity A ON A.id = EAC.activity_id
    WHERE EAC.status = "completed" AND EAC.employee_id = employeeID;
END //


DELIMITER //
CREATE PROCEDURE totalGainedPointsInCycle (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT SUM(A.points * EAC.quantity)
    FROM employeeactivitycycle EAC INNER JOIN activity A ON A.id = EAC.activity_id
    WHERE EAC.status = "completed" AND EAC.employee_id = employeeID AND EAC.cycle_id = cycleID;
END //




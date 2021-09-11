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
CREATE PROCEDURE "viewEmployeeBadges"(IN employeeID INT)
BEGIN
	SELECT B.*, EBC.date_acquired AS date FROM
    Badge B INNER JOIN employeeBadgeCycle EBC ON B.id = EBC.badge_id
    WHERE EBC.employee_id = employeeID;
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
CREATE PROCEDURE  totalGainedPointsInCycle (IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT SUM(A.points * EAC.quantity)
    FROM employeeactivitycycle EAC INNER JOIN activity A ON A.id = EAC.activity_id
    WHERE EAC.status = "completed" AND EAC.employee_id = employeeID AND EAC.cycle_id = cycleID;
END //

DELIMITER //
CREATE PROCEDURE allCycles ()
BEGIN
	SELECT *
    FROM cycle
END //

DELIMITER //
CREATE PROCEDURE submitActivity ( IN activityID INT,  IN employeeID INT, IN cycleID INT)
BEGIN
    UPDATE EmployeeActivityCycle
    SET    status ="pending"
    WHERE  employee_id = employeeID and activity_id = activityID and cycle_id = cycleID
END //

DELIMITER //
CREATE PROCEDURE findAdmin ( IN username VARCHAR(25))
BEGIN
    SELECT *
    From admin
    WHERE  username = @username
END //

DELIMITER //
CREATE PROCEDURE findEmployee ( IN username VARCHAR(50))
BEGIN
    SELECT *
    From employee
    WHERE  username = @username
END //

DELIMITER //
CREATE PROCEDURE addEmployee (IN first_name VARCHAR(20),  
                                IN last_name VARCHAR(20), IN username VARCHAR(50), 
                                IN password VARCHAR(100), IN is_developer BOOLEAN)
BEGIN
    INSERT INTO employee
                (
                first_name,
                last_name,
                username,
                password,
                is_developer
                )

    VALUES     ( 
                 @first_name,
                 @last_name,
                 @username,
                 @password,
                 @is_developer
END //

DELIMITER //
CREATE PROCEDURE addAdmin ( IN id INT,  IN first_name VARCHAR(20),  
                            IN last_name VARCHAR(20) IN username VARCHAR(50), 
                            IN password VARCHAR(100))
BEGIN
    INSERT INTO employee
                (id,
                first_name,
                last_name,
                username,
                password
                )

    VALUES     ( @id,
                 @first_name,
                 @last_name,
                 @username,
                 @password
END //


DELIMITER //
CREATE PROCEDURE getEmployeeRankings(IN cycleID INT)
BEGIN
	SELECT CONCAT(first_name, ' ', last_name) AS name, E.points, E.is_developer AS developer, E.username AS email
    FROM EmployeeCycle EC INNER JOIN employee E ON E.id = EC.employee_id
    WHERE EC.cycle_id = cycleID
    ORDER BY E.points DESC;
END //


DELIMITER //
CREATE PROCEDURE viewPracticeRanking(IN cycleID INT)
BEGIN
	SELECT P.name, AVG(P.no_of_employees) AS numberOfEmployees ,SUM(A.points) AS TotalPoints, (SUM(A.points)/AVG(P.no_of_employees)) AS pointsPerEmployee FROM
	EmployeeActivityCycle EAC INNER JOIN EmployeePractice EP ON EP.employee_id = EAC.employee_id
							  INNER JOIN practice P ON P.id = EP.practice_id
                              INNER JOIN Activity A ON A.id = EAC.activity_id
	WHERE EAC.cycle_id = cycleID AND EAC.status = 'completed'
	GROUP BY P.name
    ORDER BY pointsPerEmployee DESC;
END//

DELIMITER //
CREATE PROCEDURE getDepartmentRankings(IN cycleID INT)
BEGIN
	SELECT D.name, AVG(D.no_of_employees) AS numberOfEmployees, SUM(A.points * (ED.percentage/100)) AS WeightedPoints FROM
	EmployeeActivityCycle EAC INNER JOIN EmployeeDepartment ED ON ED.employee_id = EAC.employee_id
							  INNER JOIN department D ON D.id = ED.department_id
                              INNER JOIN Activity A ON A.id = EAC.activity_id
	WHERE EAC.cycle_id = cycleID AND EAC.status = 'completed'
	GROUP BY D.name;
END//

DELIMITER //
CREATE PROCEDURE getemployeeInfo(IN employeeID INT)
BEGIN
	SELECT E.id, E.first_name, E.last_name, E.username, E.is_developer, E.points
    FROM employee E
    WHERE E.id = employeeID;
END//


DELIMITER //
CREATE PROCEDURE "viewEmployeeActivitiesInCycle"(IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT A.id, A.name AS title, A.description, EAC.status FROM
    EmployeeActivityCycle EAC INNER JOIN Activity A ON A.id = EAC.Activity_id
    WHERE EAC.employee_id = employeeID AND EAC.cycle_id = cycleID;
END//

DELIMITER //
CREATE PROCEDURE "viewCycleDetailsForAdmin"(IN cycleID INT)
BEGIN
	SELECT C.id AS CycleID, C.start_date, C.end_date, A.first_name, A.last_name, A.id, C.current 
    FROM cycle C INNER JOIN admin A ON A.id = C.admin_id
    WHERE C.id= cycleID;
END//

DELIMITER //
CREATE PROCEDURE "getPendingActivities"(IN cycleID INT)
BEGIN
	SELECT A.* FROM
    EmployeeActivityCycle EAC INNER JOIN Activity A ON A.id = EAC.activity_id
    WHERE EAC.status = 'pending';
END//

DELIMITER //
CREATE PROCEDURE "getCompletedActivities"(IN employeeID INT, IN cycleID INT)
BEGIN
	SELECT A.* FROM
    EmployeeActivityCycle EAC INNER JOIN Activity A ON A.id = EAC.activity_id
    WHERE EAC.status = 'completed' AND EAC.employee_id = employeeID AND EAC.cycle_id = cycleID ;
END//
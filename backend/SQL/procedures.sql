CREATE PROCEDURE "addAdmin"(
    IN first_name VARCHAR(20),
    IN last_name VARCHAR(20),
    IN username VARCHAR(50),
    IN password VARCHAR(100)
) BEGIN
INSERT INTO
    admin (
        first_name,
        last_name,
        username,
        password
    )
VALUES
    (
        first_name,
        last_name,
        username,
        password
    );

END;

CREATE PROCEDURE "addEmployee"(
    IN first_name VARCHAR(20),
    IN last_name VARCHAR(20),
    IN username VARCHAR(50),
    IN password VARCHAR(100),
    IN is_developer tinyint(1)
) BEGIN
INSERT INTO
    employee (
        first_name,
        last_name,
        username,
        password,
        is_developer
    )
VALUES
    (
        first_name,
        last_name,
        username,
        password,
        is_developer
    );

END;

CREATE PROCEDURE "allCycles"() BEGIN
SELECT
    *
FROM
    cycle;

END;

CREATE PROCEDURE "assignEmployeeToActivity"(
    IN EmployeeId INT,
    IN ActivityId INT,
    IN CycleId INT
) BEGIN IF NOT EXISTS(
    SELECT
        *
    FROM
        EmployeeCycle
    WHERE
        employee_id = EmployeeId
        AND cycle_id = CycleId
) THEN
INSERT INTO
    EmployeeCycle
values
(EmployeeId, CycleId);

END IF;

IF EXISTS (
    SELECT
        *
    FROM
        EmployeeActivityCycle
    WHERE
        employee_id = EmployeeId
        AND activity_id = ActivityId
        AND cycle_id = CycleId
) THEN
UPDATE
    EmployeeActivityCycle EAC
SET
    status = 'A'
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

ELSE
INSERT INTO
    EmployeeActivityCycle
VALUES
    (EmployeeId, ActivityId, CycleId, null, 0, 'A');

END IF;

END;

CREATE PROCEDURE "createNewActivity"(
    IN name varchar(50),
    IN description varchar(100),
    IN type varchar(50),
    IN virtual_recognition BOOLEAN,
    IN points INT,
    IN adminID INT,
    OUT stat INT
) BEGIN IF EXISTS (
    SELECT
        *
    FROM
        Activity
    WHERE
        Activity.name = name
) THEN
SET
    STAT = 0;

ELSE
INSERT INTO
    Activity (
        name,
        description,
        type,
        enabled,
        virtual_recognition,
        points,
        admin_id
    )
VALUES
    (
        name,
        description,
        type,
        false,
        virtual_recognition,
        points,
        adminID
    );

SET
    STAT = 1;

END IF;

END;

CREATE PROCEDURE "createNewCycle"(IN adminID INT, IN start date, INend date,
OUT stat INT
) BEGIN DECLARE i,
n,
cycle_id,
employee_id INT;

IF EXISTS (
    SELECT
        *
    FROM
        cycle C
    WHERE
        DATE(end_date) >= DATE(start)
        AND DATE(start_date) <= DATE(end
)
) THEN
SET
    stat = 0;

ELSE
INSERT INTO
    cycle (start_date, end_date, admin_id)
values
    (start,end,
    adminID
);

SET
    stat = 1;

END IF;

END;

CREATE PROCEDURE "editActivity"(
    IN id INT,
    IN name varchar(50),
    IN description varchar(100),
    IN enabled INT,
    IN virtual_recognition BOOLEAN,
    IN points INT,
    IN cycleId INT,
    OUT stat INT
) BEGIN IF EXISTS (
    SELECT
        *
    FROM
        Activity
    WHERE
        Activity.name = name
        AND Activity.id != id
) THEN
SET
    STAT = 0;

ELSE IF (
    enabled = true
    AND NOT EXISTS (
        SELECT
            *
        FROM
            ActivityCycle
        WHERE
            activity_id = id
            AND cycle_id = cycleId
    )
) THEN
INSERT INTO
    ActivityCycle
VALUES
(id, cycleId);

END IF;

UPDATE
    Activity
SET
    Activity.name = name,
    Activity.description = description,
    Activity.type = type,
    Activity.virtual_recognition = virtual_recognition,
    Activity.enabled = enabled,
    Activity.points = points
WHERE
    Activity.id = id;

SET
    STAT = 1;

END IF;

END;

CREATE PROCEDURE "enrollInActivity"(
    IN EmployeeId INT,
    IN ActivityId INT,
    IN CycleId INT
) BEGIN IF EXISTS (
    SELECT
        *
    FROM
        EmployeeActivityCycle
    WHERE
        employee_id = EmployeeId
        AND activity_id = ActivityId
        AND cycle_id = CycleId
) THEN
UPDATE
    EmployeeActivityCycle EAC
SET
    status = 'A'
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

ELSE
INSERT INTO
    EmployeeActivityCycle
VALUES
    (EmployeeId, ActivityId, CycleId, null, 0, 'A');

END IF;

END;

CREATE PROCEDURE "findAdmin"(IN usernamein VARCHAR(50)) BEGIN
SELECT
    *
From
    admin
WHERE
    username = usernamein;

END;

CREATE PROCEDURE "findEmployee"(IN usernamein VARCHAR(50)) BEGIN
SELECT
    *
From
    employee
WHERE
    username = usernamein;

END;

CREATE PROCEDURE "getActivitiesEmployee"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    *
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "getAllActivities"(IN employeeID INT, IN cycleID INT) BEGIN DECLARE activity_type VARCHAR(50);

DECLARE is_developer boolean;

SELECT
    is_developer
FROM
    employee
WHERE
    employee.id = employeeID INTO is_developer;

IF (is_developer = 0) THEN
SET
    activity_type = 'Non-Developer';

ELSE
SET
    activity_type = 'Developer';

END IF;

SELECT
    *
FROM
    Activity A
    LEFT OUTER JOIN EmployeeActivityCycle EAC ON A.id = EAC.activity_id
    AND EAC.cycle_id = cycle_id
    AND EAC.employee_id = employeeID
WHERE
    A.type = activity_type
    AND A.enabled = 1;

END;

CREATE PROCEDURE "getCompletedActivities"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON A.id = EAC.activity_id
WHERE
    EAC.status = 'C'
    AND EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "getDeadline"() BEGIN
SELECT
    end_date,
    start_date
From
    cycle
where
    current = 1;

END;

CREATE PROCEDURE "getDepartmentRankings"(IN cycleID INT) BEGIN
SELECT
    D.name,
    AVG(D.no_of_employees) AS numberOfEmployees,
    SUM(A.points * (ED.percentage / 100)) AS WeightedPoints
FROM
    EmployeeActivityCycle EAC
    INNER JOIN EmployeeDepartment ED ON ED.employee_id = EAC.employee_id
    INNER JOIN department D ON D.id = ED.department_id
    INNER JOIN Activity A ON A.id = EAC.activity_id
WHERE
    EAC.cycle_id = cycleID
    AND EAC.status = 'C'
GROUP BY
    D.name;

END;

CREATE PROCEDURE "getemployeeInfo"(IN employeeID INT) BEGIN
SELECT
    E.id,
    E.first_name,
    E.last_name,
    E.username,
    E.is_developer,
    E.points
FROM
    employee E
WHERE
    E.id = employeeID;

END;

CREATE PROCEDURE "getEmployeeRankings"(IN cycleID INT) BEGIN
SELECT
    E.id,
    sum(A.points * EAC.quantity) AS points,
    CONCAT(first_name, ' ', last_name) AS name,
    E.is_developer
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON A.id = EAC.activity_id
    INNER JOIN employee E ON EAC.employee_id = E.id
WHERE
    EAC.cycle_id = cycleID
Group By
    E.id
Order By
    sum(A.points * EAC.quantity) desc;

END;

CREATE PROCEDURE "getEmployeesActivity"(IN activity_id INT, IN cycle_id INT) BEGIN DECLARE activity_type VARCHAR(50);

DECLARE is_developer boolean;

SELECT
    type
FROM
    Activity
WHERE
    Activity.id = activity_id INTO activity_type;

IF (activity_type = 'developer') THEN
SET
    is_developer = true;

ELSE
SET
    is_developer = false;

END IF;

SELECT
    *
FROM
    employee E
    LEFT OUTER JOIN EmployeeActivityCycle EAC ON E.id = EAC.employee_id
    AND EAC.activity_id = activity_id
    AND EAC.cycle_id = cycle_id
WHERE
    E.is_developer = is_developer;

END;

CREATE PROCEDURE "getPendingActivities"(IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    (
        SELECT
            DISTINCT(EAC.activity_id)
        FROM
            EmployeeActivityCycle EAC
        WHERE
            EAC.status = 'P'
    ) AS EAC
    INNER JOIN Activity A ON A.id = EAC.activity_id;

END;

CREATE PROCEDURE "markActivityAsComplete"(
    IN employeeID INT,
    IN activityID INT,
    IN cycleID INT
) BEGIN
UPDATE
    EmployeeActivityCycle EAC
SET
    status = 'C',
    quantity = quantity + 1,
    date_of_completion = now()
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

END;

CREATE PROCEDURE "removeActivityCompletion"(
    IN employeeID INT,
    IN activityID INT,
    IN cycleID INT
) BEGIN
UPDATE
    EmployeeActivityCycle EAC
SET
    status = 'A',
    quantity = quantity -1,
    date_of_completion = null
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

END;

CREATE PROCEDURE "submitActivity"(
    IN activityID INT,
    IN employeeID INT,
    IN cycleID INT
) BEGIN
UPDATE
    EmployeeActivityCycle EAC
SET
    status = 'P'
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

END;

CREATE PROCEDURE "totalGainedPoints"(IN employeeID INT) BEGIN
SELECT
    SUM(A.points * EAC.quantity)
FROM
    employeeactivitycycle EAC
    INNER JOIN activity A ON A.id = EAC.activity_id
WHERE
    EAC.status = "C"
    AND EAC.employee_id = employeeID;

END;

CREATE PROCEDURE "totalGainedPointsInCycle"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    SUM(A.points * EAC.quantity) AS points
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON A.id = EAC.activity_id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "unAssignEmployee"(
    IN employeeID INT,
    IN activityID INT,
    IN cycleID INT
) BEGIN
DELETE FROM
    Activity
WHERE
    employee_id = employeeID
    AND activity_id = activityID
    AND cycle_id = cycleID;

END;

CREATE PROCEDURE "updateBadge"(
    IN name VARCHAR(20),
    IN description VARCHAR(100),
    IN type VARCHAR(10),
    IN points_needed INT,
    IN enabled TINYINT(1),
    IN badgeID INT
) BEGIN
UPDATE
    Badge
SET
    name = name,
    description = description,
    type = type,
    points_needed = points_needed,
    enabled = enabled
WHERE
    id = badgeID;

END;

CREATE PROCEDURE "updateCycle"(OUT stat INT) BEGIN DECLARE end_date_current,
new_cycle DATE;

SELECT
    end_date
FROM
    cycle C
WHERE
    current = true INTO end_date_current;

SET
    stat = 0;

IF (DATE(end_date_current) < DATE(now())) THEN
UPDATE
    cycle
SET
    current = 0
WHERE
    current = 1;

set
    stat = 1;

END IF;

IF EXISTS (
    SELECT
        start_date
    FROM
        cycle
    WHERE
        DATE(start_date) = DATE(now())
) THEN
UPDATE
    cycle
SET
    current = 1
WHERE
    (DATE(start_date) = DATE(now()));

set
    stat = 2;

END IF;

END;

CREATE PROCEDURE "viewActivities"(IN Cycle_id INT) BEGIN
SELECT
    A.name AS title,
    A.description,
    A.id
FROM
    ActivityCycle AC
    INNER JOIN Activity A ON A.id = AC.activity_id
WHERE
    AC.cycle_id = Cycle_id;

END;

CREATE PROCEDURE "viewActivitiesNotInCycle"(IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    Activity A
    INNER JOIN ActivityCycle AC ON A.id = AC.activity_id
WHERE
    AC.cycle_id <> cycleID;

END;

CREATE PROCEDURE "viewActivity"(IN Activity_id INT, IN cycle_id INT) BEGIN
SELECT
    *
FROM
    Activity A
WHERE
    A.id = Activity_id;

END;

CREATE PROCEDURE "viewAllVirtualRecognitions"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    employeeactivitycycle EAC
    INNER JOIN activity A ON A.id = EAC.activity_id
WHERE
    EAC.status = "C"
    AND EAC.employee_id = employeeID
    AND A.virtual_recognition = TRUE
    and EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewCompletedTasks"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.*,
    EAC.quantity,
    EAC.date_of_completion
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID
    AND EAC.status = 'C';

END;

CREATE PROCEDURE "viewCurrentCompletedTasks"(IN employeeID INT) BEGIN
SELECT
    A.*,
    EAC.quantity,
    EAC.date_of_completion
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
    Inner Join cycle C ON C.id = EAC.cycle_id
WHERE
    EAC.employee_id = employeeID
    AND C.current = 1
    AND EAC.status = 'inProgress';

END;

CREATE PROCEDURE "viewCurrentTasks"(IN employeeID INT) BEGIN
SELECT
    A.*,
    EAC.quantity,
    EAC.status
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
    Inner Join cycle C ON C.id = EAC.cycle_id
WHERE
    EAC.employee_id = employeeID
    AND C.current = 1
    AND EAC.status = 'A';

END;

CREATE PROCEDURE "viewCycleDetailsForAdmin"(IN cycleID INT) BEGIN
SELECT
    C.id,
    C.start_date,
    C.end_date,
    A.first_name,
    A.last_name,
    A.id AS admin_id,
    C.current
FROM
    cycle C
    INNER JOIN admin A ON A.id = C.admin_id
WHERE
    C.id = cycleID;

END;

CREATE PROCEDURE "viewCycleDetailsForEmployee"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    employeeactivitycycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewCyclePendingTasks"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    *
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.status = 'P'
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewCycleToBeSubmittedTasks"(IN employeeID INT, IN cycleID INT)
SELECT
    A.*
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.status = 'A'
    AND EAC.cycle_id = cycleID;

CREATE PROCEDURE "viewEmployeeActivitiesInCycle"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.id,
    A.name AS title,
    A.description,
    EAC.status
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON A.id = EAC.Activity_id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewEmployeeBadges"(IN employeeID INT) BEGIN
SELECT
    B.*,
    EBC.date_acquired AS date
FROM
    Badge B
    INNER JOIN employeeBadgeCycle EBC ON B.id = EBC.badge_id
WHERE
    EBC.employee_id = employeeID;

END;

CREATE PROCEDURE "viewEmployeeCycleBadges"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    B.*
FROM
    employeeBadgeCycle EBC
    INNER JOIN Badge B ON EBC.badge_id = B.id
WHERE
    EBC.employee_id = employeeID
    AND EBC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewEmployeeCycles"(IN employeeID INT) BEGIN
SELECT
    C.id AS cycle_id,
    C.start_date,
    C.end_date
FROM
    cycle C
    INNER JOIN EmployeeCycle EC ON C.id = EC.cycle_id
WHERE
    EC.employee_id = employeeID;

END;

CREATE PROCEDURE "viewEmployeeCycleVirtualRecognition"(IN employeeID INT, IN cycleID INT) BEGIN
SELECT
    A.*
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND EAC.cycle_id = cycleID
    AND EAC.status = 'C'
    AND A.virtual_recognition = TRUE;

END;

CREATE PROCEDURE "viewEmployeeDepartments"(IN employeeID INT) BEGIN
SELECT
    D.*
FROM
    department D
    INNER JOIN EmployeeDepartment ED ON D.id = ED.department_id
WHERE
    ED.employee_id = employeeID;

END;

CREATE PROCEDURE "viewEmployeeLeaderboard"(IN cycleID INT) BEGIN
SELECT
    E.id,
    sum(A.points),
    CONCAT(first_name, ' ', last_name) AS name,
    E.is_developer
FROM
    EmployeeActivityCycle EAC
    INNER JOIN Activity A ON A.id = EAC.activity_id
    INNER JOIN employee E ON EAC.employee_id = E.id
WHERE
    EAC.cycle_id = cycleID
    and EAC.status = 'completed'
Group By
    E.id
Order By
    sum(A.points) desc;

END;

CREATE PROCEDURE "viewEmployeePersonalInfo"(IN employeeID INT) BEGIN
SELECT
    E.id,
    E.first_name,
    E.last_name,
    E.username,
    E.is_developer
FROM
    employee E
WHERE
    E.id = employeeID;

END;

CREATE PROCEDURE "viewEmployeePractice"(IN employeeID INT) BEGIN
SELECT
    P.*
FROM
    practice P
    INNER JOIN EmployeePractice EP ON P.id = EP.practice_id
WHERE
    EP.employee_id = employeeID;

END;

CREATE PROCEDURE "viewEmployeesInCycle"(IN cycleID INT) BEGIN
SELECT
    E.id,
    E.first_name,
    E.last_name,
    E.username,
    E.is_developer
FROM
    EmployeeCycle EC
    INNER JOIN employee E ON EC.employee_id = E.id
WHERE
    EC.cycle_id = cycleID;

END;

CREATE PROCEDURE "viewPendingTasks"(IN employeeID INT) BEGIN
SELECT
    *
FROM
    employeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND A.status = 'P';

END;

CREATE PROCEDURE "viewPracticeRanking"(IN cycleID INT) BEGIN
SELECT
    P.name,
    AVG(P.no_of_employees) AS numberOfEmployees,
    SUM(A.points) AS TotalPoints,
    (SUM(A.points) / AVG(P.no_of_employees)) AS pointsPerEmployee
FROM
    EmployeeActivityCycle EAC
    INNER JOIN EmployeePractice EP ON EP.employee_id = EAC.employee_id
    INNER JOIN practice P ON P.id = EP.practice_id
    INNER JOIN Activity A ON A.id = EAC.activity_id
WHERE
    EAC.cycle_id = cycleID
    AND EAC.status = 'C'
GROUP BY
    P.name
ORDER BY
    pointsPerEmployee DESC;

END;

CREATE PROCEDURE "viewToBeSubmittedTasks"(IN employeeID INT) BEGIN
SELECT
    *
FROM
    employeeActivityCycle EAC
    INNER JOIN Activity A ON EAC.activity_id = A.id
WHERE
    EAC.employee_id = employeeID
    AND A.status = 'A';

END;
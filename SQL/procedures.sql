DELIMITER //
CREATE PROCEDURE viewCompletedTasks (IN employeeID INT)
BEGIN
	SELECT * 
    FROM  EmployeeActivity EA INNER JOIN Activity A ON EA.activity_id = A.id
							  INNER JOIN Cycle C ON C.id = A.cycle_id
    WHERE EA.employee_id = employeeID AND EA.is_complete = TRUE AND C.current = TRUE;
END //

CREATE DATABASE ITWorx;
USE ITWorx;

CREATE TABLE employee(
	id INT PRIMARY KEY AUTO_INCREMENT,
    firt_name VARCHAR(20),
    last_name VARCHAR(20),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_developer BOOLEAN
);
CREATE TABLE admin (
	id INT PRIMARY KEY AUTO_INCREMENT,
    firt_name VARCHAR(20),
    last_name VARCHAR(20),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE department(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    no_of_employees INT
);

CREATE TABLE EmployeeDepartment(
	employee_id INT,
    department_id INT,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY(employee_id, department_id),
    FOREIGN KEY(employee_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE practice(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    no_of_employees INT
);

CREATE TABLE EmployeePractice(
	employee_id INT,
    practice_id INT,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY(employee_id, practice_id),
    FOREIGN KEY(employee_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(practice_id) REFERENCES practice(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Badge(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    description VARCHAR(100),
    type VARCHAR(50),
    points_needed INT,
    enabled BOOLEAN
);

CREATE TABLE cycle(
	id INT PRIMARY KEY AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    admin_id INT,
    current BOOLEAN,
    FOREIGN KEY(admin_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employeeBadgeCycle(
	employee_id INT,
    badge_id INT,
    cycle_id INT,
    date_acquired DATE,
    PRIMARY KEY(employee_id, badge_id, cycle_id),
    FOREIGN KEY(employee_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(badge_id) REFERENCES badge(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(cycle_id) REFERENCES cycle(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Activity ( 
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(100),
    type VARCHAR(50),
    enabled BOOLEAN,
    virtual_recognition BOOLEAN,
    points INT,
    admin_id INT,
    FOREIGN KEY(admin_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE EmployeeActivityCycle (
	employee_id INT(11),
    activity_id INT(11),
    cycle_id INT(11),
    PRIMARY KEY(employee_id, activity_id, cycle_id),
    FOREIGN KEY(employee_id) REFERENCES Employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(activity_id) REFERENCES activity(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(cycle_id) REFERENCES Cycle(id) ON DELETE CASCADE ON UPDATE CASCADE,
    date_of_completion DATE,
    quantity INT,
    status VARCHAR(100),
    CHECK(STATUS IN ('completed', 'pending', 'inProgress'))
);


CREATE TABLE EmployeeCycles (
	employee_id INT,
    cycle_id INT,
    PRIMARY KEY (employee_id, cycle_id) ,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cycle_id) REFERENCES cycle(id) ON DELETE CASCADE ON UPDATE CASCADE
);
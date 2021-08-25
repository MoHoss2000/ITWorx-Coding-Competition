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
    FOREIGN KEY(employee_id) REFERENCES employee(id),
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
    FOREIGN KEY(employee_id) REFERENCES employee(id),
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

CREATE TABLE employeeBadge(
	employee_id INT,
    badge_id INT,
    date_acquired DATE,
    PRIMARY KEY(employee_id, badge_id),
    FOREIGN KEY(employee_id) REFERENCES employee(id),
    FOREIGN KEY(badge_id) REFERENCES badge(id)
);

CREATE TABLE cycle(
	id INT PRIMARY KEY AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    admin_id INT,
    FOREIGN KEY(admin_id) REFERENCES admin(id)
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
    cycle_id INT,
    FOREIGN KEY(admin_id) REFERENCES admin(id),
    FOREIGN KEY(cycle_id) REFERENCES cycle(id)
);

CREATE TABLE employeeActivity(
	employee_id INT,
    activity_id INT,
    is_complete BOOLEAN,
    date_of_completion DATE,
    PRIMARY KEY(employee_id, activity_id),
    FOREIGN KEY(employee_id) REFERENCES employee(id),
    FOREIGN KEY(activity_id) REFERENCES Activity(id)
);



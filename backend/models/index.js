'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const employeeActivity = require('./employeeActivity');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
db.Employee.belongsToMany(db.Practice, {through: 'EmployeePractice'})
db.Practice.belongsToMany(db.Employee, {through: 'EmployeePractice'})

db.Employee.belongsToMany(db.Department, {through: 'EmployeeDepartment'})
db.Department.belongsToMany(db.Employee, {through: 'EmployeeDepartment'})

db.Badge.belongsToMany(db.Employee, {through: 'EmployeeBadge'})
db.Employee.belongsToMany(db.Badge, {through: 'EmployeeBadge'})

db.Employee.belongsToMany(db.Activity, {through: 'EmployeeActivity'})
db.Activity.belongsToMany(db.Employee, {through: 'EmployeeActivity'})

db.Cycle.hasMany(db.EmployeeActivity)
db.EmployeeActivity.belongsTo(db.Cycle)

db.Cycle.belongsTo(db.Admin)
db.Admin.hasMany(db.Cycle)

db.Activity.belongsTo(db.Admin)
db.Admin.hasMany(db.Activity)

db.Activity.belongsTo(db.Cycle)
db.Cycle.hasMany(db.Activity)


// Mo7awla fashela ll ternary relationship

// db.Employee.belongsToMany(db.Badge, { through: db.EmployeeBadge });
// db.Badge.belongsToMany(db.Employee, { through: db.EmployeeBadge });
// db.EmployeeBadge.belongsTo(db.Employee)
// db.EmployeeBadge.belongsTo(db.Badge)
// db.Employee.hasMany(db.EmployeeBadge)
// db.Badge.hasMany(db.EmployeeBadge)

// db.Cycle.belongsToMany(db.EmployeeBadge, { through: db.EmployeeBadgeCycle });
// db.EmployeeBadge.belongsToMany(db.Cycle, { through: db.EmployeeBadgeCycle });
// db.EmployeeBadgeCycle.belongsTo(db.Cycle);
// db.EmployeeBadgeCycle.belongsTo(db.EmployeeBadge);
// db.Cycle.hasMany(db.EmployeeBadgeCycle);
// db.EmployeeBadge.hasMany(db.EmployeeBadgeCycle);

module.exports = db;
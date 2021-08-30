module.exports = (sequelize, DataTypes) => {
    const EmployeeCycle = sequelize.define("EmployeeCycle", {
     
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeCycle;
  };
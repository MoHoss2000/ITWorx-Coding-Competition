module.exports = (sequelize, DataTypes) => {
    const EmployeeBadge = sequelize.define("EmployeeCycle", {
     
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeBadge;
  };
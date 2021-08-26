module.exports = (sequelize, DataTypes) => {
    const EmployeeDepartment = sequelize.define("EmployeeDepartment", {
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeDepartment;
  };
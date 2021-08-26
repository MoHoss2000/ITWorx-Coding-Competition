module.exports = (sequelize, DataTypes) => {
    const EmployeePractice = sequelize.define("EmployeePractice", {
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
    return EmployeePractice;
  };
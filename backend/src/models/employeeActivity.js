module.exports = (sequelize, DataTypes) => {
    const EmployeeActivity = sequelize.define("EmployeeActivity", {
      date_of_completion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeActivity;
  };
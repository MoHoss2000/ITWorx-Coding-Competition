module.exports = (sequelize, DataTypes) => {
    const EmployeeActivity = sequelize.define("EmployeeActivity", {
      date_of_completion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['completed', 'pending', 'inProgress']]
        },
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeActivity;
  };
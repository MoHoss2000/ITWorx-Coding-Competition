module.exports = (sequelize, DataTypes) => {
    const EmployeePractice = sequelize.define("EmployeePractice", {
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      percentage:{
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100
        }
      } 
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeePractice;
  };
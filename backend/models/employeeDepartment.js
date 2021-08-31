module.exports = (sequelize, DataTypes) => {
    const EmployeeDepartment = sequelize.define("EmployeeDepartment", {
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
    return EmployeeDepartment;
  };
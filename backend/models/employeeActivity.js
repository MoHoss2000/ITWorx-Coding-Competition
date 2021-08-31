const models= require("../index")

module.exports = (sequelize, DataTypes) => {
    const EmployeeActivity = sequelize.define("EmployeeActivity", {
     
      date_of_completion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
      type: DataTypes.STRING,
     }
    },
     {
      timestamps: false,
      freezeTableName: true,
     }
    );
    
    return EmployeeActivity;
  };
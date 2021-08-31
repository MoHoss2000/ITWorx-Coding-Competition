const models= require("../index")

module.exports = (sequelize, DataTypes) => {
    const EmployeeActivity = sequelize.define("EmployeeActivity", {
     
      date_of_completion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
<<<<<<< HEAD
      type: DataTypes.STRING,
     }
=======
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['completed', 'pending', 'inProgress']]
        },
      }
>>>>>>> bf7186c24ef17deed4a8003b3cee360b2e06b516
    },
     {
      timestamps: false,
      freezeTableName: true,
     }
    );
    
    return EmployeeActivity;
  };
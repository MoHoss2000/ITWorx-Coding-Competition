module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("Department", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      number_of_employees:{
          type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return Department;
  };
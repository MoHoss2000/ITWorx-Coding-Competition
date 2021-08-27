module.exports = (sequelize, DataTypes) => {
    const Practice = sequelize.define("Practice", {
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
    return Practice;
  };
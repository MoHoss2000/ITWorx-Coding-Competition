module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("Activity", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      virtual_recognition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      points:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
    return Activity;
  };
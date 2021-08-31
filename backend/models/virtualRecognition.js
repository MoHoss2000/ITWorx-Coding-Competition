module.exports = (sequelize, DataTypes) => {
    
    const virtualRecognition = sequelize.define("Badge", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
    return virtualRecognition;
  };
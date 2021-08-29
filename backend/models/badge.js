module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define("Badge", {
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
      type: {
        type: DataTypes.STRING,
      },
      points_needed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enabled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );

    return Badge;
  };
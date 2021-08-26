module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
    return Admin;
  };
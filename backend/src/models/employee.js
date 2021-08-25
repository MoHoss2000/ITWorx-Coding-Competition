module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      firt_name: {
        type: DataTypes.STRING,
        // allowNull: false,
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
      is_developer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
    return Employee;
  };
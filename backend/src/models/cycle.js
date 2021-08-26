module.exports = (sequelize, DataTypes) => {
    const Cycle = sequelize.define("Cycle", {
     id: {
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      current:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
    return Cycle;
};
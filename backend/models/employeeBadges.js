module.exports = (sequelize, DataTypes) => {
    const EmployeeBadge = sequelize.define("EmployeeBadge", {
      date_aquired: {
        type: DataTypes.DATE,
        allowNull: false
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
    );
    return EmployeeBadge;
  };
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    EmployeeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmployeeName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    EmployeeEmail: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    EmployeePhone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    EmployeePosition: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    EmployeePhotos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmployeeId" },
        ]
      },
    ]
  });
};

export default (sequelize, DataTypes) => {
    const ChargingStation = sequelize.define("ChargingStation", {
      StationID: {
        type: DataTypes.STRING, // or DataTypes.UUID if you want to use UUIDs
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      TotalChargers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Ensures the value is an integer
          min: 0, // Ensures total chargers cannot be negative
        },
      },
      AdminID: {
        type: DataTypes.STRING, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, can be null if status is not always required
      },
    }, {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      createdAt: 'CreatedAt', // Custom field name for createdAt
      updatedAt: 'UpdatedAt', // Custom field name for updatedAt
    });

    ChargingStation.associate = (models) => {
      ChargingStation.hasMany(models.Charger, {
        foreignKey: 'StationID',
        as: 'Chargers',
        onDelete: 'CASCADE',
      });
    };
  
    return ChargingStation;
  };
  
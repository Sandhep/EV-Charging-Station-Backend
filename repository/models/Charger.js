export default (sequelize, DataTypes) => {
    const Charger = sequelize.define("Charger", {
      ChargerID: {
        type: DataTypes.STRING, // or DataTypes.UUID if you want to use UUIDs
        primaryKey: true,
      },
      StationID: {
        type: DataTypes.STRING, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Capacity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Ensures the value is a float
          min: 0, // Ensures capacity cannot be negative
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

    Charger.associate = (models) => {
      Charger.belongsTo(models.ChargingStation, {
        foreignKey: 'StationID',
        as: 'Station',
        onDelete: 'CASCADE',
      });

      Charger.hasMany(models.Booking, { 
        foreignKey: "ChargerID", 
        as: "Bookings" 
      });
    };

    return Charger;
  };
  
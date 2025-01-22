export default (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking",
    {
      BookingID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      UserID: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      ChargerID: {
        type: DataTypes.STRING, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      VehicleID: {
        type: DataTypes.STRING, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        }
      },
      Duration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        }
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Ensures the value is a valid date
        }
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, can be null if status is not always required
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      createdAt: "CreatedAt", // Custom field name for createdAt
      updatedAt: "UpdatedAt", // Custom field name for updatedAt
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.UserModel, {
      foreignKey: "UserID",
      targetKey: "UserID",
      onDelete: "CASCADE", // Optional: define behavior on delete
    });

    Booking.belongsTo(models.Charger, {
      foreignKey: "ChargerID",
      as: "Charger",
      onDelete: "CASCADE", // Optional: define behavior on delete
    });

    Booking.belongsTo(models.Vehicle, {
      foreignKey: "VehicleID",
      as: "Vehicle",
      onDelete: "CASCADE", // Optional: define behavior on delete
    });
  };

  return Booking;
};

export default (sequelize, DataTypes) => {
    const ChargingSession = sequelize.define("ChargingSession", {
      SessionID: {
        type: DataTypes.UUID, // or DataTypes.UUID if you want to use UUIDs
        primaryKey: true,
      },
      BookingID: {
        type: DataTypes.UUID, // or DataTypes.UUID if this refers to a UUID
        allowNull: true,
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
      StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Ensures the value is a valid date
        },
      },
      EndTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Ensures the value is a valid date
        },
      },
      EnergyConsumed: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Ensures the value is a float
          min: 0, // Ensures energy consumed cannot be negative
        },
      },
      Cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Ensures the value is a float
          min: 0, // Ensures cost cannot be negative
        },
      },
    }, {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      createdAt: 'CreatedAt', // Custom field name for createdAt
      updatedAt: 'UpdatedAt', // Custom field name for updatedAt
    });

    ChargingSession.associate = (models) => {
      ChargingSession.belongsTo(models.Booking, {
        foreignKey: 'BookingID',
        targetKey: 'BookingID',
        onDelete: 'CASCADE', // Optional: define behavior on delete
      });
    };
    

    return ChargingSession;
  };
  
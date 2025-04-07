export default (sequelize, DataTypes) => {
    const Vehicle = sequelize.define("Vehicle", {
      VehicleID: {
        type: DataTypes.UUID, // or DataTypes.UUID if you want to use UUIDs
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      UserID: {
        type: DataTypes.UUID, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      LicensePlateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Make: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      BatteryCapacity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Ensures the value is a float
          min: 0, // Ensures battery capacity cannot be negative
        },
      },
    }, {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      createdAt: 'CreatedAt', // Custom field name for createdAt
      updatedAt: 'UpdatedAt', // Custom field name for updatedAt
    });
    
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.UserModel, {
        foreignKey: 'UserID',
        targetKey: 'UserID',
        onDelete: 'CASCADE', // Optional: define behavior on delete
      });
    };
    
  
    return Vehicle;
  };
  
export default (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
      PaymentID: {
        type: DataTypes.STRING, // or DataTypes.UUID if you want to use UUIDs
        primaryKey: true,
      },
      BookingID: {
        type: DataTypes.STRING, // or DataTypes.UUID if this refers to a UUID
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Ensures the value is a float
          min: 0, // Ensures amount cannot be negative
        },
      },
      PaymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      PaymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures no empty strings are allowed
        },
      },
      Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true, // Ensures the value is a valid date
        },
      },
    }, {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      createdAt: 'CreatedAt', // Custom field name for createdAt
      updatedAt: 'UpdatedAt', // Custom field name for updatedAt
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Booking, {
          foreignKey: 'BookingID',
          targetKey: 'BookingID',
          onDelete: 'CASCADE', // Optional: define behavior on delete
        });
    };
      
  
    return Payment;
  };
  
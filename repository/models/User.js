export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    UserID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures no empty strings are allowed
      },
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true, // Ensures no empty strings are allowed
        isEmail: true, // Ensures the value is a valid email format
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures no empty strings are allowed
      },
    },
    PasswordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures no empty strings are allowed
      },
    },
    Role: {
      type: DataTypes.STRING(50),
      defaultValue: 'user',
    },
  }, {
    timestamps: true, // Automatically adds CreatedAt and UpdatedAt fields
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  });

  return User;
};

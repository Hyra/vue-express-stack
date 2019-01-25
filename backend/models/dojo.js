module.exports = (sequelize, DataTypes) => {
  const Dojo = sequelize.define(
    "dojo",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      handle: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Handle is taken"
        },
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  //   Dojo.hasOne(User, { foreignKey: "sensei_id" });

  Dojo.associate = models => {
    Dojo.hasMany(models.user);
  };

  return Dojo;
};

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

  // Dojo.associate = models => {
  // Dojo.belongsToMany(models.user, {
  //   as: "students",
  //   through: "dojo_students"
  // });
  // Dojo.belongsToMany(models.user, { as: "senseis", through: "dojo_senseis" });
  // };

  return Dojo;
};

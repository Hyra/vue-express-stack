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

  Dojo.associate = models => {
    Dojo.hasMany(models.profile);
    // Dojo.hasMany(models.profile, { as: "Senseis" });
    // Dojo.hasMany(models.profile, { as: "Students" });
  };

  // Dojo.associate = models => {
  //   Dojo.belongsToMany(models.user, {
  //     as: "Students",
  //     through: "students"
  //   });
  //   Dojo.belongsToMany(models.user, {
  //     as: "Senseis",
  //     through: "senseis"
  //   });
  // };

  return Dojo;
};

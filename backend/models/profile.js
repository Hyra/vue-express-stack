module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "profile",
    {
      stripe_id: {
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

  Profile.associate = models => {
    Profile.belongsTo(models.user);
    Profile.belongsTo(models.dojo);
  };

  return Profile;
};

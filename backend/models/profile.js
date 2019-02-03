module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "profile",
    {
      stripeId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      isSensei: {
        type: DataTypes.BOOLEAN,
        default: false
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
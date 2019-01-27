import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email is taken"
        },
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [7, 42],
            msg: "Password must be between 7 and 42 karakters."
          }
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = models => {
    User.belongsToMany(models.dojo, { as: "dojos", through: "user_dojos" });
  };

  return User;
};

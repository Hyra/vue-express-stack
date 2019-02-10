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
            args: [7, 142],
            msg: "Password must be between 7 and 142 karakters."
          }
        }
      }
    },
    {
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ["password"] }
      },
      scopes: {
        withPassword: {
          attributes: {}
        }
      }
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

  User.beforeUpdate(async user => {
    if (user.changed("password")) {
      user.password = await user.generatePasswordHash();
      console.log(user.password);
    }
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = models => {
    User.hasMany(models.profile);
    // User.belongsToMany(models.dojo, { as: "dojos", through: "user_dojos" });
    // User.belongsToMany(models.profile, {
    //   as: "profile",
    //   through: "user_profiles"
    // });
  };

  return User;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FollowShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FollowShip.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'followerUser'
      });
      FollowShip.belongsTo(models.User, {
        foreignKey: 'followingId',
        as: 'followingUser'
      });
    }
  }
  FollowShip.init({
    followerId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FollowShip',
    underscored: true,
  });
  return FollowShip;
};
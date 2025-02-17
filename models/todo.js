'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER  
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
};
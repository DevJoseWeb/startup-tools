'use strict';

module.exports = (sequelize, DataTypes) => {
  const Canva = sequelize.define('Canva', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    board: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('board'));
      },
      set: function (value) {
        this.setDataValue('board', JSON.stringify(value));
      },
    }
  });

  Canva.associate = models => {
    Canva.belongsTo(models.User);
  };

  return Canva;
};

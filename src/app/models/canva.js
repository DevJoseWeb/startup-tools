'use strict';

const moment = require('moment');
moment.locale('pt');

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
    },
    lastUpdatedAt: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return moment.utc(this.getDataValue('updatedAt')).fromNow();
      },
    },
  });

  Canva.associate = models => {
    Canva.belongsTo(models.User);
  };

  return Canva;
};

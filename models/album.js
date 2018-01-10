'use strict';
module.exports = (sequelize, DataTypes) => {
  var album = sequelize.define('album', {
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    tracklist: DataTypes.TEXT,
    catno: DataTypes.STRING,
    discogsNum: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  });
  album.asscoiate = function(models){
    models.album.belongsTo(models.user);
  }

  return album;
};

// tag.associate = function (models) {
//   models.tag.belongsToMany(models.plant, { through: models.plant_tag });;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class books extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   books.init({
//     title: DataTypes.STRING,
//     price: DataTypes.INTEGER,
//     author: DataTypes.STRING,
//     cover: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'books',
//   });
//   return books;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    author: DataTypes.STRING,
    cover: DataTypes.TEXT
  }, {
    timestamps: true,
    tableName: 'books',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};
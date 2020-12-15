// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };


'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [{
      title: 'Hai, Miiko! Vol. 1',
      price: 35000,
      author: 'Ono Eriko',
      cover: './image/MiikoVol1'
    }, {
      title: 'Hai, Miiko! Vol. 2',
      price: 36000,
      author: 'Ono Eriko',
      cover: './image/MiikoVol2'
    }, {
      title: 'Hai, Miiko! Vol. 3',
      price: 32000,
      author: 'Ono Eriko',
      cover: './image/MiikoVol3'
    }, {
      title: 'Hai, Miiko! Vol. 4',
      price: 34000,
      author: 'Ono Eriko',
      cover: './image/MiikoVol4'
    }, {
      title: 'Hai, Miiko! Vol. 5',
      price: 31000,
      author: 'Ono Eriko',
      cover: './image/MiikoVol5'
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.bulkDelete('books', null, {});    
  }
};
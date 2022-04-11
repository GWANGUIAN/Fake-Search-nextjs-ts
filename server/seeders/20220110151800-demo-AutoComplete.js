"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "AutoCompletes",
      [
        {
          userId: 1,
          word: "김코딩",
        },
        {
          userId: 1,
          word: "박해커",
        },
        {
          userId: 1,
          word: "가",
        },
        {
          userId: 1,
          word: "가나",
        },
        {
          userId: 1,
          word: "가나다",
        },

        {
          userId: 1,
          word: "라면",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("AutoCompletes", null, {});
  },
};

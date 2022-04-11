"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "SearchData",
      [
        {
          userId: 1,
          word: "김코딩",
          profile: '{"type":"profile","view":1,"name":"김코딩","job":"웹 개발자","profileImg":"","info":[{"title":"신체","content":"175cm"},{"title":"출생","content":"1996.12.10"},{"title":"학력","content":"카이스트"}],"subinifo":[{"title":"방송","content":[{"image":"","title":"코딩은 무엇인가"},{"image":"","title":"코딩은 무엇이다"}]}],"order":1}',
          news: '{"type":"news","view":1,"content":[{"reporter":"조선일보","datetime":"1시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"디스패치","datetime":"2시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"중앙일보","datetime":"4시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"동아일보","datetime":"2021-01-15","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""}],"order":2}',
          image: '{"type":"image","view":1,"content":{"img1":"","img2":"","img3":"","img4":""},"order":3}',
          music: '{"type":"music","date":"2021.12.13","view":1,"title":"RE:WIND","artist":"이세계 아이돌","album":"","info":"우왁굳이 작사한 곡","order":4}',
        },
        {
          userId: 1,
          word: "박해커",
          profile: '{"type":"profile","view":1,"name":"박해커","job":"해커","profileImg":"","info":[{"title":"신체","content":"150cm"},{"title":"출생","content":"1998.11.20"},{"title":"학력","content":"하버드"}],"subinifo":[{"title":"방송","content":[{"image":"","title":"해킹은 무엇인가"},{"image":"","title":"해킹은 무엇이다"}]}],"order":2}',
          news: '{"type":"news","view":1,"content":[{"reporter":"조선일보","datetime":"1시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"디스패치","datetime":"2시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"중앙일보","datetime":"4시간전","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""},{"reporter":"동아일보","datetime":"2021-01-15","title":"[긴급속보] OOO♡OOO 열애중?! 알고보니.....","content":"기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용","img":""}],"order":3}',
          image: '{"type":"image","view":1,"content":{"img1":"","img2":"","img3":"","img4":""},"order":4}',
          music: '{"type":"music","date":"2021.12.13","view":1,"title":"RE:WIND","artist":"이세계 아이돌","album":"","info":"우왁굳이 작사한 곡","order":1}',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SearchData", null, {});
  },
};

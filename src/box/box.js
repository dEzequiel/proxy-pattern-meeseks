/** Class Box */

const meeseksFactory = require("../mrmeeseeks/mrmeesek");

function Box() {
  this.name = "Rick's box";
  this.mrMeeseks = null;
}

// Box prototype methods
Box.prototype = {
  createMrMeeseks: function createMrMeeseks() {
    if (!this.mrMeeseks) this.mrMeeseks = meeseksFactory.singletonMeesek.get();

    // Creates new object based in a prototype.
    const proto = Object.create(this.mrMeeseks);
    return proto;
  },

  getMrMeeseks: function getMrMeeseks() {
    return this.mrMeeseks;
  },
};

var factory = (function () {
  let instance;
  return {
    get: function () {
      if (!instance) instance = new Box();

      return instance;
    },
  };
})();

exports.singletonBox = factory;

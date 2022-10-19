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
    return Object.create(this.mrMeeseks);
  },

  getMrMeeseks: function getMrMeeseks() {
    return this.mrMeeseks;
  },

  pressButton: function pressButton(dimension) {
    dimension.push(this.createMrMeeseks());
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

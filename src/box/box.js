/** Class Box */

const meeseksFactory = require("../mrmeeseeks/mrmeesek");

function Box() {
  this.name = "Rick's box";
  this.mrMeeseks = null;
}

// Box prototype methods
Box.prototype = {
  createMrMeeseks: function createMrMeeseks() {
    if (!this.mrMeeseks) this.mrMeeseks = meeseksFactory.get();

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

Object.assign(module.exports, factory);
/**
 * What's happening here is defining the { .. } object literal with your module's public API specified, 
 * and then Object.assign(..) is performing a shallow copy of all those properties onto the existing 
 * module.exports object, instead of replacing it This is a nice balance of convenience and safer module behavior.
 */
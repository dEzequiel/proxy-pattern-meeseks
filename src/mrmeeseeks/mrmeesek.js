function MrMeesek() {
  this.messageOnCreate = "I'm Mr Meeseeks! Look at meeee!";
  this.messageOnRequest = [
    "Oooh yeah! Can do!",
    "Yes sireee!",
    "Oh, yeah!, Yes, ma'am!",
  ];
}

var factory = (function () {
  const instance = new MrMeesek();

  return {
    get: function () {
      return instance;
    },
  };
})();

exports.singletonMeesek = factory;

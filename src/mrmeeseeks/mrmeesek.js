function MrMeesek() {
  this.messageOnCreate = "I'm Mr Meeseeks! Look at meeee!";
  this.messageOnRequest = [
    "Oooh yeah! Can do!",
    "Yes sireee!",
    "Oh, yeah!, Yes, ma'am!",
  ];
}

MrMeesek.prototype = {
    speakOnRequest: function speakOnRequest() {
        return this.messageOnRequest[Math.floor(Math.random() * 3)]
    },

    makeRequest: function makeRequest(action, subject) {
        function execute(object) {
            return action + " " + object
        }
        this.action = execute(subject)
        return this.action
    },

    fulFillRequest: function fulFillRequest() {
        return this.action() + " All done!!";
    }
}

var factory = (function () {
  const instance = new MrMeesek();

  return {
    get: function () {
      return instance;
    },
  };
})();

Object.assign(module.exports, factory);

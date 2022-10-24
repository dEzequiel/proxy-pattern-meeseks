const { expect } = require("@jest/globals");

const factory = require("../../src/box/box");
const box = factory.get();

describe("Box factory singleton", () => {
  test("Create box using factory", () => {
    // call object property name = function
    expect(box.name).toBe("Rick's box");
  });

  test("Factory returns the same box instance", () => {
    const firstBoxInstance = factory.get();
    const secondBoxInstance = factory.get();

    expect(firstBoxInstance === secondBoxInstance).toBeTruthy();

    // My box singleton instance is not part of this new object.
    function Box() {
      this.name = "Rick's box";
      this.mrMeeseks = null;
    }

    const boxMocked = new Box();
    expect(firstBoxInstance).not.toBeInstanceOf(Box);
    expect(firstBoxInstance === boxMocked).toBeFalsy();
  });
});

describe("Shadowing of variables", () => {
  let meesek = box.createMrMeeseks();

  test("Shadowing messageOnCreate variable", () => {
    /**
     * Prototype contains the property, not the actual object. See the difference between
      toHaveProperty() and hasOwnProperty()
     */
    expect(meesek).toHaveProperty("messageOnCreate");
    expect(meesek.hasOwnProperty("meesageOnCreate")).toBeFalsy();
  });

  test("Object now has own property messageOnCreate", () => {
    // Object now has his own property and inherits other properties from the prototype.
    meesek.messageOnCreate = "Caaaan dooooo!!";
    expect(meesek.hasOwnProperty("messageOnCreate")).toBeTruthy();
  });

  test("Prototype original message don't change", () => {
    const proto = box.getMrMeeseks();
    const objectProto = Object.getPrototypeOf(meesek);

    expect(proto.hasOwnProperty("messageOnCreate")).toBeTruthy();
    expect(objectProto.hasOwnProperty("messageOnCreate")).toBeTruthy();

    /**
     * meesek object inherits from a prototype and has his own messageOnCreate property with a
     * different value from his proto.

     * See how the meesek prototype maintains a different messageOnCreate than the actual object.
     */
    expect(objectProto.messageOnCreate).toEqual(
      expect.stringMatching("I'm Mr Meeseeks! Look at meeee!")
    );
    expect(meesek.messageOnCreate).toEqual(
      expect.stringMatching("Caaaan dooooo!!")
    );
  });
});

describe("When pressing a button a new meesek is added", () => {
  test("Should add new objects to  a dimension", () => {
    let reality = [];
    box.pressButton(reality);

    expect(reality).toHaveLength(1);
    expect(reality[0]).toHaveProperty(
      "messageOnCreate",
      "I'm Mr Meeseeks! Look at meeee!"
    );

    expect(reality[0]).toMatchObject(box.getMrMeeseks());
  });
});

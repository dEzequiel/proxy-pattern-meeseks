const { expect } = require("@jest/globals");

const meeseks = require("../../src/mrmeeseeks/mrmeesek");
const box = require("../../src/box/box");

var boxSingleton = box.singletonBox.get();

describe("Meesek factory singleton", () => {
  test("Create Meesek using factory", () => {
    expect(meeseks.singletonMeesek.get()).toBeTruthy();
  });

  test("Factory returns the same meesek instance", () => {
    const firstMeesekInstance = meeseks.singletonMeesek.get();
    const secondMeesekInstance = meeseks.singletonMeesek.get();

    expect(firstMeesekInstance === secondMeesekInstance).toBeTruthy();
  });
});

describe("", () => {
  test("Shadowing variable 'messageOnCreate'", () => {
    const meeseks = boxSingleton.createMrMeeseks();
    expect(meeseks).toHaveProperty("messageOnCreate");

    /**
     * Property 'messageOnCreate'exists in prototype object, not in the
     * actual object created by itself.
     *
     * The hasOwnProperty() method returns a boolean indicating whether t
     * he object has the specified property as its own property
     * as opposed to inheriting it).
     */

    expect(meeseks.hasOwnProperty("messageOnCreate")).toBeFalsy();

    // Shadowing
    /**
     * Now meeseks object has it's own 'messageOnCreate'property
     * not inherit from the object, create by itself.
     */
    meeseks.messageOnCreate = "Caaaan dooooo!!";
    expect(meeseks.hasOwnProperty("messageOnCreate")).toBeTruthy();

    const proto = boxSingleton.getMrMeeseks();
    expect(proto).toHaveProperty("messageOnCreate");
    expect(proto.messageOnCreate).toEqual(
      expect.stringMatching("I'm Mr Meeseeks! Look at meeee!")
    );
  });
});

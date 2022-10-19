const { expect } = require("@jest/globals");

const meesekFactory = require("../../src/mrmeeseeks/mrmeesek");
const boxFactory = require("../../src/box/box");

var box = boxFactory.singletonBox.get();
var meesek = meesekFactory.singletonMeesek.get()

describe("Meesek factory singleton", () => {
    test("Create Meesek using factory", () => {
        expect(meesek).toBeTruthy();
        expect(meesek === meesekFactory.singletonMeesek.get()).toBeTruthy()
  });

  test("Factory returns the same meesek instance", () => {
        const firstMeesekInstance = meesekFactory.singletonMeesek.get();
        const secondMeesekInstance = meesekFactory.singletonMeesek.get();

        expect(firstMeesekInstance === secondMeesekInstance).toBeTruthy();
  });
});

describe("Shadowign of variables", () => {
  test("Shadowing variable 'messageOnCreate'", () => {
    const meeseks = box.createMrMeeseks();
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

    const proto = box.getMrMeeseks();
    expect(proto).toHaveProperty("messageOnCreate");
    expect(proto.messageOnCreate).toEqual(
      expect.stringMatching("I'm Mr Meeseeks! Look at meeee!")
    );
  });
});

describe("Mock box.pressButton", () => {
    const BoxPressButtonMock = jest.fn()
                                    .mockImplementation( dimension =>
                                                        dimension.push(Object.create(meesek)))
                                    .mockName('pressButtonMock')


    let reality = []
    let mockedBox = { pressButton: BoxPressButtonMock };

    mockedBox.pressButton(reality)
    expect(reality).toHaveLength(1);

    expect(reality[0]).toHaveProperty(
            "messageOnCreate",
            "I'm Mr Meeseeks! Look at meeee!"
            );

    expect(reality[0]).toMatchObject(box.createMrMeeseks());

})

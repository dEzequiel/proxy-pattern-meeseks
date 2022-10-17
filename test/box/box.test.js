const { expect } = require("@jest/globals");

const box = require("../../src/box/box");

describe("Box factory singleton", () => {
  test("Create box using factory", () => {
    // call object property name = function
    expect(box.singletonBox.get().name).toBe("Rick's box");
  });

  test("Factory returns the same box instance", () => {
    const firstBoxInstance = box.singletonBox.get();
    const secondBoxInstance = box.singletonBox.get();

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

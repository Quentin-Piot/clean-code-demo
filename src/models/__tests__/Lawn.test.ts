import Lawn from "../Lawn";

describe("Lawn tests", () => {
  test("should be well created", async () => {
    const lawn = new Lawn({
      bottomLeft: { x: 0, y: 0 },
      northRight: { x: 5, y: 5 },
    });
    expect(lawn).toBeTruthy();
  });
});

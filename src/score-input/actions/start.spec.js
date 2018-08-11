import { startAction } from "./start";
import * as lolex from "lolex";

test("it should returns start action", () => {
  const clock = lolex.install();
  const actual = startAction(13, ["John", "Mary", "Henry", "Joe"], 1);
  expect(actual).toMatchSnapshot();
  clock.uninstall();
});

import { trans as t } from "../../utils/translate";
import { themeSourcesSelector } from "./theme-sources";

test("it should select translated drop down source", () => {
  const actual = themeSourcesSelector(t);
  expect(actual).toMatchSnapshot();
});

import * as path from "path";
import * as fs from "fs";
import { languages } from "./languages";

test("All languages should have their local file", done => {
  const files = languages.map(lang => `${lang}.js`);
  const dir = path.join(__dirname, "locals");

  files.sort();

  fs.readdir(dir, (err, result) => {
    expect(err).toBeNull();
    result.sort();
    expect(files).toEqual(result);

    done();
  });
});

test("All locals should export a default object", () => {
  languages
    .map(lang => `./locals/${lang}`)
    .map(require)
    .forEach(module => {
      expect(typeof module.default).toBe("object");
    });
});

test("All locals should have same entries", () => {
  const en = require("./locals/en").default;
  const defaultKeys = Object.keys(en);

  languages
    .filter(lang => lang !== "en")
    .map(lang => `./locals/${lang}`)
    .map(mod => require(mod))
    .map(res => res.default)
    .map(lang => Object.keys(lang))
    .forEach(keys => {
      // We are not sorting here because key order should be preserved
      expect(keys).toEqual(defaultKeys);
    });
});

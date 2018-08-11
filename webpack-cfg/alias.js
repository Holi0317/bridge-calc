module.exports = {
  resolve: {
    alias: {
      /*
       * Alias lodash
       * Use ES-version of lodash for tree shaking (Probably wont do much. But at least unifying the version of lodash)
       */
      lodash: "lodash-es",

      // Use non-compiled or ES module version of the following libraries
      reselect: "reselect/src/index.js",
      "react-i18next": "react-i18next/src/index.js",
      "react-sortable-hoc": "react-sortable-hoc/dist/es6"
    }
  }
};

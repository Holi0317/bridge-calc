module.exports = {
  resolve: {
    alias: {
      /*
       * Alias lodash
       * Use ES-version of lodash for tree shaking (Probably wont do much. But at least unifying the version of lodash)
       */
      lodash: "lodash-es"
    }
  }
};

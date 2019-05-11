/**
 * Redux migration on root tree for redux-persist.
 * The key for each function is the target version.
 */
export const migrations = {
  /**
   * This migration would migrate redux state from v1 to v2.
   * (We don't have v0 of redux state)
   *
   * This migration would reset theme property to Bright pink.
   * Because we have changed
   *
   * @param state Redux state in version 1.
   */
  2: (state: any) => ({
    ...state,
    theme: {
      theme: "Pink",
      dark: false
    }
  })
};

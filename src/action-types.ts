export const enum ActionTypes {
  // Current game (score-input) module
  BID = 'CURRENT_GAME/BID',
  CHANGE_PLAYERS = 'CURRENT_GAME/CHANGE_PLAYERS',
  SET_BID = 'CURRENT_GAME/SET_BID',
  SET_WIN = 'CURRENT_GAME/SET_WIN',
  SKIP = 'CURRENT_GAME/SKIP',
  START = 'CURRENT_GAME/START',
  UNDO = 'CURRENT_GAME/UNDO',
  WIN = 'CURRENT_GAME/WIN',
  REPLACE_CURRENT_GAME = 'CURRENT_GAME/REPLACE_CURRENT_GAME',

  // Entry module
  ADD_PLAYER = 'ENTRY/ADD_PLAYER',
  RESET_ENTRY = 'ENTRY/RESET',
  SET_ENTRY_PROPS = 'ENTRY/SET_PROPS',

  // Game Settings module
  INIT_SETTINGS = 'GAME_SETTINGS/INIT_SETTINGS',
  SET_MAKER = 'GAME_SETTINGS/SET_MAKER',
  SET_NAMES = 'GAME_SETTINGS/SET_NAMES',
  ADD_NAME = 'GAME_SETTINGS/ADD_NAME',
  TOGGLE_SETTING_PANEL = 'GAME_SETTINGS/TOGGLE_SETTING_PANEL',

  // PrevGames module
  ADD_GAME = 'PREV_GAMES/ADD_GAME',
  DELETE_GAME = 'PREV_GAMES/DELETE_GAME',
  RESET_GAMES = 'PREV_GAMES/RESET_GAMES',
  SAVE_GAME = 'PREV_GAMES/SAVE_GAME',
  SET_GAME_MODAL = 'PREV_GAMES/SET_GAME_MODAL',

  // Toast Singleton module
  SHOW_TOAST = 'TOAST/SHOW',
  CLOSE_TOAST = 'TOAST/CLOSE',

  // Theme module
  SET_THEME = 'THEME/SET_THEME'
}

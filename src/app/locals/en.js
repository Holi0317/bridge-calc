/**
 * Default local file.
 *
 * This file is the default local file that would fed into i18next.
 *
 * Rules for this file:
 * 1. Only use JS features from ES2015 or before. This file will not be transpiled
 * 2. Do NOT import any module here
 * 3. Write translation strings in their zone. We do not use namespce in the app
 * 4. After adding a new translation entry, add the new entry to all locals in English
 * 5. Run tests. We have test for validating translation format.
 *
 * For adding a new language, you have to
 * 1. Add the short form of the language to src/app/i18n.ts, languages array
 * 2. Copy and rename this file to the short form of your language
 * 3. Change `Default local file.` to `Translation for MY_LANGUAGE` in this comment.
 *    (We try to preserve entries' line number for easier diff-ing)
 * 4. Translate strings
 * 5. Add a new entry under languages zone that maps the new language to its name
 *    in all other local files
 * 6. Send a pull request on GitLab
 *
 * You may check out zh-tw as an example. Or open up an issue on GitLab and I'll prepare for you.
 */

const local = {
  // Title
  'Bridge calculator': 'Bridge calculator',

  // App bar titles
  'Global settings': 'Global settings',
  'Entry': 'Entry',
  'Scoreboard': 'Scoreboard',
  'Game over': 'Game over',
  'Round {{currentRound}} of {{rounds}}': 'Round {{currentRound}} of {{rounds}}',
  'Not found': 'Not found',

  // 404 page view
  'Page not found!': 'Page not found!',
  'Click here to return to main menu': 'Click here to return to main menu',

  // Page fatal error messages
  'Ouch! An error has occurred.': 'Ouch! An error has occurred.',
  'Hopefully your data is safe. Refresh page may fix the problem.': 'Hopefully your data is safe. Refresh page may fix the problem.',
  'Error message: {{message}}': 'Error message: {{message}}',

  // App update messages
  'This app is now available offline': 'This app is now available offline',
  'App will update after page reload': 'App will update after page reload',

  // Home page, main menu buttons
  'Continue': 'Continue',
  'New Game': 'New Game',
  'Previous games': 'Previous games',
  'Settings': 'Settings',
  'Information': 'Information',
  'Support/bug': 'Support/bug',
  'Input': 'Input',

  // Entry (or New game) view
  'Player Names': 'Player Names',
  'Add player': 'Add player',
  'Delete name': 'Delete name',
  'Import names': 'Import names',
  'You have not played any game yet': 'You have not played any game yet',
  'Import names from previous games': 'Import names from previous games',
  'Imported names successfully': 'Imported names successfully',
  'Options': 'Options',
  'Start': 'Start',
  'Player name': 'Player name',
  'Number of rounds': 'Number of rounds',
  'Starting round': 'Starting round',

  // Validation messages
  'At least 2 players is required for a game': 'At least 2 players is required for a game',
  'Too many players. Upper limit is {{limit}} players.': 'Too many players. Upper limit is {{limit}} players.',
  'Name cannot be empty': 'Name cannot be empty',
  'Cannot choose that': 'Cannot choose that',
  'Too many stacks': 'Too many stacks',
  'Too less stacks': 'Too less stacks',
  'Name cannot be repeated': 'Name cannot be repeated',
  'Impossible to continue the game due to too many players': 'Impossible to continue the game due to too many players',

  // Time used in score-input route
  'Time: {{time}}': 'Time: {{time}}',

  // Score-input route form
  'Bid': 'Bid',
  'Win': 'Win',
  'Next': 'Next',
  'Undo': 'Undo',
  'Bid for {{name}}': 'Bid for {{name}}',
  'Win for {{name}}': 'Win for {{name}}',
  'Game has ended': 'Game has ended',

  // Scoreboard and game settings
  'Name': 'Name',
  'Previous round score': 'Previous round score',
  'Total score': 'Total score',
  'Rank': 'Rank',
  'Round {{n}}': 'Round {{n}}',
  'Edit players': 'Edit players',
  'Change names': 'Change names',
  'Player name edit is disabled when editing maker': 'Player name edit is disabled when editing maker',
  'Cancel': 'Cancel',
  'Submit': 'Submit',
  'Choose the maker for this round': 'Choose the maker for this round',
  'Expected rounds: {{rounds}}': 'Expected rounds: {{rounds}}',
  'Player name changed!': 'Player name changed!',
  'Change maker': 'Change maker',
  'Maker edit is disabled when editing player names': 'Maker edit is disabled when editing player names',
  'Maker changed!': 'Maker changed!',
  'Maker': 'Maker',
  'Skip rounds': 'Skip rounds',
  'Skip this round': 'Skip this round',
  'Skip to last round': 'Skip to last round',
  'End game': 'End game',
  'Skipped round(s). You are now playing round {{round}}': 'Skipped round(s). You are now playing round {{round}}',
  'Already at the last round. Cannot skip.': 'Already at the last round. Cannot skip.',

  // Global settings
  'Change theme': 'Change theme',
  'Change language': 'Change language',
  'Error when changing language. Error: {{err}}': 'Error when changing language. Error: {{err}}',
  'Changed language successfully': 'Changed language successfully',
  'Clear all data': 'Clear all data',
  'All data is cleared': 'All data is cleared',
  'Version: {{version}}': 'Version: {{version}}',

  // Languages. Please add an entry in this zone if you are adding a new language
  'en': 'English',
  'zh': 'Chinese',
  'zh-tw': 'Chinese traditional',

  // Previous game route
  'You have not played any game yet.': 'You have not played any game yet.',
  'Click here to start a new game': 'Click here to start a new game',
  'Game on {{date}}': 'Game on {{date}}',
  'With {{players}}': 'With {{players}}',
  'Delete': 'Delete',
  'Time used: {{timeUsed}}': 'Time used: {{timeUsed}}',

  // Data migration from v1
  'Migrated game data from old version': 'Migrated game data from old version'
}

export default local

/**
 * Chinese (general) local file.
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
  'Bridge calculator': '橋牌計分器',

  // App bar titles
  'Global settings': '全域設定',
  'Entry': '開始遊戲',
  'Scoreboard': '計分板',
  'Game over': '遊戲終了',
  'Round {{currentRound}} of {{rounds}}': '第 {{currentRound}} 回合 / {{rounds}} 個回合',
  'Not found': '找不到網頁',

  // 404 page view
  'Page not found!': '找不到網頁',
  'Click here to return to main menu': '按此以回到主目錄',

  // Page fatal error messages
  'Ouch! An error has occurred.': '不好了! 發生了未知的錯誤',
  'Hopefully your data is safe. Refresh page may fix the problem.': '重新整理可能會解決問題',
  'Error message: {{message}}': '錯誤信息: {{message}}',

  // App update messages
  'This app is now available offline': '這個應用現在可以離線使用',
  'App will update after page reload': '有可用的更新 重刷頁面以應用更新',

  // Home page, main menu buttons
  'Continue': '繼續遊戲',
  'New Game': '新增遊戲',
  'Previous games': '之前的遊戲',
  'Settings': '設定',
  'Information': '資訊',
  'Support/bug': '支援/回報Bug',
  'Input': '輸入',

  // Entry (or New game) view
  'Player Names': '玩家名稱',
  'Add player': '新增玩家',
  'Delete name': '刪除名稱',
  'Import names': '匯入名稱',
  'You have not played any game yet': '你未曾遊玩過遊戲',
  'Import names from previous games': '從以前的遊戲中匯入名稱',
  'Imported names successfully': '成功匯入名稱',
  'Options': '遊戲選項',
  'Start': '開始',
  'Player name': '玩家名稱',
  'Number of rounds': '回合數量',
  'Starting round': '起始回合',

  // Validation messages
  'At least 2 players is required for a game': '最少需要2位玩家才能開始遊戲',
  'Too many players. Upper limit is {{limit}} players.': '太多玩家 最多只支援{{limit}}人',
  'Name cannot be empty': '名字必需被填上',
  'Cannot choose that': '不能選擇這個',
  'Too many stacks': '太多墩',
  'Too less stacks': '太少墩',
  'Name cannot be repeated': '名字不可以重複',
  'Impossible to continue the game due to too many players': '太多玩家 遊戲無法繼續',

  // Time used in score-input route
  'Time: {{time}}': '已用時間: {{time}}',

  // Score-input route form
  'Bid': '估計墩數',
  'Win': '贏取墩數',
  'Next': '下一步',
  'Undo': '還原',
  'Bid for {{name}}': '{{name}}的估計墩數',
  'Win for {{name}}': '{{name}}的贏取墩數',
  'Game has ended': '遊戲已完結',

  // Scoreboard and game settings
  'Name': '名稱',
  'Previous round score': '上一回合分數',
  'Total score': '總分',
  'Rank': '名次',
  'Round {{n}}': '第{{n}}回合',
  'Edit players': '更改玩家',
  'Change names': '更改名字',
  'Player name edit is disabled when editing maker': '修改莊家時無法更改玩家',
  'Cancel': '取消',
  'Submit': '提交',
  'Choose the maker for this round': '為這個回合選擇莊家',
  'Expected rounds: {{rounds}}': '預計會有{{rounds}}個回合',
  'Player name changed!': '玩家列表已更改!',
  'Change maker': '更改莊家',
  'Maker edit is disabled when editing player names': '修改玩家時無法更改莊家',
  'Maker changed!': '莊家已經更改!',
  'Maker': '莊家',
  'Skip rounds': '回合管理',
  'Skip this round': '跳過這個回合',
  'Skip to last round': '跳至最後一個回合',
  'End game': '結束遊戲',
  'Skipped round(s). You are now playing round {{round}}': '已跳過回合 現在是第{{round}}個回合',
  'Already at the last round. Cannot skip.': '已經在最後一個回合',

  // Global settings
  'Change theme': '更改配色',
  'Change language': '更改語言',
  'Error when changing language. Error: {{err}}': '更改語言時發生錯誤 原因: {{err}}',
  'Changed language successfully': '成功更改語言',
  'Clear all data': '清除所有數據',
  'All data is cleared': '你的數據已被清除',
  'Version: {{version}}': '版本: {{version}}',

  // Languages. Please add an entry in this zone if you are adding a new language
  'en': 'English (英文)',
  'zh': 'Chinese (中文)',
  'zh-tw': 'Chinese traditional (繁體中文)',

  // Previous game route
  'You have not played any game yet.': '你未曾遊玩過遊戲',
  'Click here to start a new game': '按此以開始一局新的遊戲',
  'Game on {{date}}': '於{{date}}的遊戲',
  'With {{players}}': '成員: {{players}}',
  'Delete': '刪除',
  'Time used: {{timeUsed}}': '已用的時間: {{timeUsed}}',

  // Data migration from v1
  'Migrated game data from old version': '已經從舊版本中匯入資料'
}

export default local

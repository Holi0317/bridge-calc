import test from 'tape'
import {GameState} from '../../src/services/game-board/game-state'
import {GameBoard, GameBoardEvents} from '../../src/services/game-board/game-board'
import {GameMetaManager} from '../../src/services/game-board/game-meta-manager'
import {PlayerManager} from '../../src/services/game-board/player-manager'
import {Timer} from '../../src/services/game-board/timer'

function getBoard() {
  return new GameBoard()
}

function getStartOpts() {
  return {
    players: ['John', 'Mary'],
    cards: 52,
    rounds: 13,
    startingRound: 1
  }
}

test('default state of game board', t => {
  const board = getBoard()

  t.equal(board.state, GameState.NOT_STARTED, 'game state should be NOT_STARTED')
  t.equal(board.startTime.getTime(), 0, 'Start time should start at 0')
  t.assert(board.playerManager instanceof PlayerManager, 'player manager should be an instance of PlayerManager')
  t.assert(board.metaManager instanceof GameMetaManager, 'meta manager should be an instance of GameMetaManager')
  t.assert(board.timer instanceof Timer, 'timer should be an instance of Timer')
  t.end()
})

test('start() should set state according to parameters', t => {
  const board = getBoard()
  const opts = getStartOpts()
  const now = new Date().getTime()
  board.start(opts)

  t.equal(board.state, GameState.BID, 'Game state should be BID')
  t.assert((board.startTime.getTime() - now) < 1000, 'Start Time should be set')
  t.equal(board.playerManager.players.length, 2, '2 players should exists')
  t.deepEqual(board.playerManager.players.map(p => p.name), ['John', 'Mary'], '2 players should named John and Mary')
  t.assert(board.timer._startTime !== null, 'Timer should be started')
  t.assert(board.metaManager.currentGame !== null, 'MetaManager should have a current game')
  t.equal(board.metaManager.currentGame.name, '1', 'The round of name should be 1')
  t.equal(board.metaManager.futureGames.length, 12, 'MetaManager should have 12 games in the future')
  t.equal(board.metaManager.prevGames.length, 0, 'MetaManager should have no previous game')
  t.end()
})

test('start() should be able to start with startingRound > 1', t => {
  const board = getBoard()
  const opts = getStartOpts()
  opts.startingRound = 5
  board.start(opts)

  t.assert(board.metaManager.currentGame !== null, 'MetaManager should have a current game')
  t.equal(board.metaManager.currentGame.name, '5', 'The round of name should be 5')
  t.equal(board.metaManager.futureGames.length, 8, 'MetaManager should have 8 games in the future')
  t.equal(board.metaManager.prevGames.length, 4, 'MetaManager should have 4 previous games')
  t.equal(board.playerManager.players[0].scoreboard.totalScore, 0, 'players should have 0 in total score')
  t.equal(board.playerManager.players[1].scoreboard.totalScore, 0, 'players should have 0 in total score')
  t.end()
})

test('start() should emit events', t => {
  t.plan(2)
  const board = getBoard()
  const opts = getStartOpts()
  board.on(GameBoardEvents.Start, () => {
    t.pass('Start event has fired')
  })
  board.on(GameBoardEvents.StateChanged, () => {
    t.pass('State changed event has fired')
  })
  board.start(opts)

  t.end()
})

test('bid() should throw error when game is not in bid state', t => {
  const board = getBoard()

  t.throws(board.bid, '[bid] No game is started and bid is called', 'Error should be thrown')
  t.end()
})

test('bid() should mutate state to GameState.WIN', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.bid()

  t.equal(board.state, GameState.WIN, 'state should be WIN')
  t.end()
})

test('bid() should fire event', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.on(GameBoardEvents.StateChanged, () => {
    t.pass('StateChanged event fired')
    t.end()
  })
  board.bid()
})

test('win() should throw error when game is in win state', t => {
  const board = getBoard()
  t.throws(board.win, '[win] No game is started and win is called', 'Error should be thrown')
  t.end()
})

test('win() should fire event', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.bid()

  board.on(GameBoardEvents.StateChanged, () => {
    t.pass('StateChanged event fired')
    t.end()
  })
  board.win()
})

test('skip() should set 0 for mark and skip a round', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.skip()

  t.equal(board.metaManager.prevGames.length, 1, '1 round should have passed')
  t.equal(board.metaManager.currentGame.name, '2', 'the second round should be active')
  t.equal(board.metaManager.futureGames.length, 11, '11 rounds should be in the future')
  const totalScores = board.playerManager.players.map(p => p.scoreboard.totalScore)
  t.deepEqual(totalScores, [0, 0], 'Both players should score 0 in total score')
  t.end()
})

test('skip() should throw error when game have not stared', t => {
  const board = getBoard()
  t.throws(board.skip, '[skip] Game is not started or has ended', 'Error should be thrown')
  t.end()
})

test('skip() should NOT fire event', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  let eventsFired = 0
  board.on(GameBoardEvents.StateChanged, () => {
    eventsFired += 1
  })
  board.skip()

  t.equal(eventsFired, 0, 'No event should be fired')
  t.end()
})

test('revert() should do no-op when state is not win', t => {
  const board = getBoard()
  board.revert()
  t.equal(board.state, GameState.NOT_STARTED, 'Game state should not be mutated')
  t.end()
})

test('revert() should set state to bid when state is originally win', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.bid()
  board.revert()

  t.equal(board.state, GameState.BID, 'Bid state should be set')
  t.end()
})

test('revert() should reset players win mark', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.bid()
  for (const player of board.playerManager.players) {
    player.scoreboard.win = 1
  }
  board.revert()

  const actual = board.playerManager.players.map(p => p.scoreboard.win)
  const expected = [null, null]
  t.deepEqual(actual, expected, 'All win state should be null')
  t.end()
})

test('revert() should fire event', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)
  board.bid()
  board.on(GameBoardEvents.StateChanged, () => {
    t.pass('StateChanged event fired')
    t.end()
  })
  board.revert()
})

test('dump() should dump current state of game board', t => {
  const board = getBoard()
  const opts = getStartOpts()
  board.start(opts)

  const actual = board.dump()
  // Need to mock out startTime as it varies
  t.assert(actual.startTime > 0, 'Start time should set on dumped')
  actual.startTime = 1000
  const expected = {
    state: GameState.BID,
    startTime: 1000
  }
  t.deepEqual(actual, expected, 'Dumped state should be expected')
  t.end()
})

test('fromDumped() should load in state of game board', t => {
  const dumped = {
    state: GameState.BID,
    startTime: 1000
  }
  const board = GameBoard.fromDumped(dumped)

  t.equal(board.state, GameState.BID, 'state should be set by load')
  t.equal(board.startTime.getTime(), 1000, 'startTime should be set by load')
  t.end()
})

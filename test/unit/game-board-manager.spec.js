import test from 'tape'
import {GameBoardManager, GameBoardManagerEvents} from '../../src/services/game-board/game-board-manager'
import {GameBoard} from '../../src/services/game-board/game-board'

function getManager() {
  return new GameBoardManager()
}

test('start() should create a new GameBoard', t => {
  const manager = getManager()
  manager.start({
    players: ['John'],
    cards: 52,
    rounds: 13,
    startingRound: 1
  })

  const actual = manager.currentGame
  t.assert(actual instanceof GameBoard, 'currentGame should be an instance of GameBoard')
  t.end()
})

test('close() should dispose current GameBoard', t => {
  const manager = getManager()
  manager.currentGame = new GameBoard()
  manager.close()

  const actual = manager.currentGame
  t.equal(actual, null, 'currentGame should point to null after closing')
  t.end()
})

test('assignGame should emit an event', t => {
  const manager = getManager()
  manager.on(GameBoardManagerEvents.CurrentGameChanged, opts => {
    t.equal(opts.oldValue, null, 'oldValue in event option should be null')
    t.assert(opts.newValue instanceof GameBoard, 'newValue in event option should be an instance of GameBoard')
    t.end()
  })

  manager.assignGame(new GameBoard())
})

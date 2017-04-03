import test from 'tape'
import {GameMetaManager, GameMetaManagerEvents} from '../../src/services/game-board/game-meta-manager'
import {PlayerManager} from '../../src/services/game-board/player-manager'
import {GameMeta} from '../../src/services/game-board/game-meta'

function getPlayerManager() {
  const playerManager = new PlayerManager()
  playerManager.addPlayer(['a', 'b', 'c', 'd'])
  return playerManager
}

function getManager() {
  const playerManager = getPlayerManager()
  return new GameMetaManager(playerManager)
}

test('initiateGames(1) should create 1 game meta object in futureGames', t => {
  const manager = getManager()

  manager.initiateGames(1)
  const actual = manager.futureGames.length
  const expected = 1

  t.equal(actual, expected, 'Array with 1 as length is expected')
  t.assert(manager.futureGames[0] instanceof GameMeta, 'The object in futureGames should be a GameMeta object')
  t.end()
})

test('initiateGames(3) should create 3 game meta object in futureGames', t => {
  const manager = getManager()

  manager.initiateGames(3)
  const actual = manager.futureGames.length
  const expected = 3

  t.equal(actual, expected, 'Array with 3 as length is expected')
  for (const el of manager.futureGames) {
    t.assert(el instanceof GameMeta, 'Objects in futureGames should be a GameMeta object')
  }
  t.end()
})

test('Calling initiateGames multiple times should correctly reset itself', t => {
  const manager = getManager()

  manager.initiateGames(5)
  manager.initiateGames(3)
  const actual = manager.futureGames.length
  const expected = 3

  t.equal(actual, expected, 'Array with 3 as length is expected')
  t.end()
})

test('reset should reset states', t => {
  const manager = getManager()

  manager.reset()
  t.equal(manager.currentGame, null, 'currentGame should be null')
  t.equal(manager.prevGames.length, 0, 'prevGames should be an empty array')
  t.equal(manager.futureGames.length, 0, 'futureGames should be an empty array')
  t.end()
})

test('getAllMetas should return empty list when not started', t => {
  const manager = getManager()

  const actual = manager.getAllMetas().length
  const expected = 0

  t.equal(actual, expected, 'Empty array is expected')
  t.end()
})

test('getAllMetas should return all meta objects after game has started', t => {
  const manager = getManager()

  manager.initiateGames(12)
  manager.next()
  manager.next()

  const actual = manager.getAllMetas().length
  const expected = 12

  t.equal(actual, expected, 'Array with 12 as length is expected')
  t.end()
})

test('next should fail when no further game is available', t => {
  const manager = getManager()

  manager.initiateGames(1)
  manager.next()  // Start the first game
  manager.next()  // End the first game. Now should have no game left

  t.throws(manager.next, '[next] No further round available and no current game is started.', 'Next should throw error when no further game is available')
  t.end()
})

test('next should handle first state mutation', t => {
  const manager = getManager()

  manager.initiateGames(5)
  manager.next()

  t.equal(manager.prevGames.length, 0, 'Previous games should be empty')
  t.equal(manager.futureGames.length, 4, 'There should be 4 games pending in the future')
  t.notEqual(manager.currentGame, null, 'Current game should not be null')
  t.end()
})

test('next should handle state mutation for multiple times', t => {
  const manager = getManager()

  manager.initiateGames(5)
  manager.next()
  manager.next()
  manager.next()

  t.equal(manager.prevGames.length, 2, 'Previous games should be empty')
  t.equal(manager.futureGames.length, 2, 'There should be 4 games pending in the future')
  t.notEqual(manager.currentGame, null, 'Current game should not be null')
  t.end()
})

test('next should emit CurrentGameChanged event', t => {
  const manager = getManager()

  manager.on(GameMetaManagerEvents.CurrentGameChanged, () => {
    t.pass('Event fired')
    t.end()
  })
  manager.initiateGames(5)
  manager.next()

})

test('setPlayerOrder should fail if there is no current game', t => {
  const manager = getManager()

  t.equal(manager.currentGame, null, 'currentGame should be null on creation')
  t.throws(manager.setPlayerOrder, '[setPlayerOrder] current game or maker is not set.', 'Error should be thrown if currentGame is null')
  t.end()
})

test('setPlayerOrder should fail if current game does not have maker set', t => {
  const manager = getManager()

  manager.initiateGames(5)
  manager.next()
  manager.currentGame.maker = null

  t.throws(manager.setPlayerOrder, '[setPlayerOrder] current game or maker is not set.', 'Error should be thrown if currentGame.maker is null')
  t.end()
})

test('setPlayerOrder should set player order according to maker position', t => {
  const manager = getManager()

  manager.initiateGames(5)
  manager.next()
  manager.setPlayerOrder()

  const actual = manager.currentGame.playerOrder[0]
  const expected = manager.currentGame.maker
  t.equal(actual, expected, 'First player should be maker')
  for (const playerID of manager.currentGame.playerOrder) {
    t.equal(typeof playerID, 'string', 'PlayerOrder should be filled up with string')
  }
  t.end()
})

test('setPlayerOrder should set player order according to maker position after all player have been a maker', t => {
  const manager = getManager()

  manager.initiateGames(12)
  manager.next()
  manager.next()
  manager.next()
  manager.next()
  manager.next()
  manager.setPlayerOrder()

  const actual = manager.currentGame.playerOrder[0]
  const expected = manager.currentGame.maker
  t.equal(actual, expected, 'First player should be maker')
  for (const playerID of manager.currentGame.playerOrder) {
    t.equal(typeof playerID, 'string', 'PlayerOrder should be filled up with string')
  }
  t.end()
})

test('addRound should append a round meta to the end', t => {
  const manager = getManager()

  manager.initiateGames(2)
  manager.addRound(12)

  t.equal(manager.futureGames.length, 3, 'A round meta should be appended to the end of futureGames')
  const addedRound = manager.futureGames[2]
  t.assert(addedRound.isExtra, 'The added round should be an extra round')
  t.equal(addedRound.name, '1', 'Assignment of round name should be reflected in added meta')
  t.equal(addedRound.cardPerPlayer, 12, 'Assignment of card per player should be in the added meta')
  t.end()
})

test('dump should work on empty game meta manager', t => {
  const manager = getManager()

  const actual = manager.dump()
  const expected = {
    currentIndex: -1,
    metas: []
  }
  t.deepEqual(actual, expected, 'Dumped data should equal to expected')
  t.end()
})

test('dumped data should have currentIndex of number of games if all round has ended', t => {
  const manager = getManager()

  manager.initiateGames(2)
  manager.next()
  manager.next()
  manager.next()

  const actual = manager.dump().currentIndex
  const expected = 2
  t.equal(actual, expected, 'Dumped data should equal to expected')
  t.end()
})

test('dump should work on normal situation', t => {
  const manager = getManager()

  manager.initiateGames(3)
  manager.next()
  manager.next()

  const actual = manager.dump()
  const expected = {
    currentIndex: 1,
    metas: manager.getAllMetas().map(meta => meta.dump())
  }
  t.deepEqual(actual, expected, 'Dumped data should equal to expected')
  t.end()
})

test('dump of a single meta should return its serialized data', t => {
  const meta = new GameMeta(5)
  meta.playerOrder = ['a', 'b', 'c', 'd']

  const actual = meta.dump()
  const expected = {
    maker: null,
    name: '5',
    cardPerPlayer: 5,
    isExtra: false,
    playerOrder: ['a', 'b', 'c', 'd']
  }
  t.deepEqual(actual, expected, 'Dumped data should equal to expected')
  t.end()
})

test('load of a single meta should work', t => {
  const dumped = {
    maker: null,
    name: '5',
    cardPerPlayer: 5,
    isExtra: false,
    playerOrder: ['a', 'b', 'c', 'd']
  }
  const loaded = GameMeta.fromDumped(dumped)

  t.equal(loaded.maker, null, 'Maker should be null')
  t.equal(loaded.name, '5', 'Round name should be 5')
  t.equal(loaded.cardPerPlayer, 5, 'Card per player should be 5')
  t.equal(loaded.isExtra, false, 'This round should not be an extra one')
  t.deepEqual(loaded.playerOrder, ['a', 'b', 'c', 'd'], 'Player order should preserve')
  t.end()
})

test('fromDumped() for empty game meta manager', t => {
  const dumped = {
    currentIndex: -1,
    metas: []
  }
  const manager = GameMetaManager.fromDumped(getPlayerManager(), dumped)

  t.equal(manager.prevGames.length, 0, 'Previous game array should be empty')
  t.equal(manager.futureGames.length, 0, 'Future game array should be empty')
  t.equal(manager.currentGame, null, 'Current game should be null')
  t.equal(manager.extraRoundCount, 0, 'Number of extra round should be 0')
  t.end()
})

test('fromDumped() for ended game metas', t => {
  const dumped = {
    currentIndex: 3,
    metas: [1, 2, 3].map(i => new GameMeta(i)).map(m => m.dump())
  }

  const manager = GameMetaManager.fromDumped(getPlayerManager(), dumped)
  t.equal(manager.prevGames.length, 3, 'Previous game array length should be 3')
  t.equal(manager.futureGames.length, 0, 'Future game array should be empty')
  t.equal(manager.currentGame, null, 'Current game should be null')
  t.equal(manager.extraRoundCount, 0, 'Number of extra round should be 0')
  t.end()
})

test('fromDumped() for normal situation', t => {
  const dumped = {
    currentIndex: 1,
    metas: [1, 2, 3].map(i => new GameMeta(i)).map(m => m.dump())
  }

  const manager = GameMetaManager.fromDumped(getPlayerManager(), dumped)
  t.equal(manager.prevGames.length, 1, 'Previous game array should have one element')
  t.equal(manager.futureGames.length, 1, 'Future game array should have one element')
  t.equal(manager.currentGame.name, '2', 'Current game should be the 2nd one')
  t.equal(manager.extraRoundCount, 0, 'Number of extra round should be 0')
  t.end()
})

test('fromDumped() should fill in extraRoundCount with number of extra round', t => {
  const dumped = {
    currentIndex: 1,
    metas: [1, 2, 3, '1'].map(i => new GameMeta(i)).map(m => m.dump())
  }

  const manager = GameMetaManager.fromDumped(getPlayerManager(), dumped)
  t.equal(manager.extraRoundCount, 1, '1 extra round should exists')
  t.end()
})

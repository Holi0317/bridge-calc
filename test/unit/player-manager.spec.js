import test from 'tape'
import {PlayerManager, PlayerManagerEvents} from '../../src/services/game-board/player-manager'

function getManager() {
  return new PlayerManager()
}

test('reset should properly reset player manager states', t => {
  t.plan(3)
  const manager = getManager()

  manager.reset()

  t.equal(manager.players.length, 0, 'Player array should be empty')
  t.equal(manager.currentPlayerIndex, -1, 'Current player index should start from -1')
  t.equal(manager._playerMap.size, 0, 'Player map should be empty')
})

test('addPlayer(name) should work', t => {
  t.plan(1)
  const manager = getManager()

  manager.addPlayer('John')
  const actual = manager.players[0].name
  const expected = 'John'

  t.equal(actual, expected, 'New player named John should be added')
})

test('addPlayer([name, name]) should work', t => {
  t.plan(2)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary'])

  const players = manager.players
  t.equal(players[0].name, 'John', 'First player should named John')
  t.equal(players[1].name, 'Mary', 'Second player should named Mary')
})

test('addPlayer should emit an event', t => {
  t.plan(1)
  const manager = getManager()
  manager.on(PlayerManagerEvents.PlayerListChanged, () => {
    t.pass('PlayerListChanged event fired')
  })

  manager.addPlayer('John')
})

test('removePlayer(ID) should remove him from player list', t => {
  t.plan(2)
  const manager = getManager()
  const players = manager.players

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const ID = players[1].ID
  manager.removePlayer(ID)

  t.equal(players[0].name, 'John', 'First player should named John')
  t.equal(players[1].name, 'Joe', 'Second player should named Joe')
})

test('removePlayer should throw an error when the ID does not exists', t => {
  t.plan(1)
  const manager = getManager()
  const nonExistID = 'This ID should not point to any player'

  manager.addPlayer('John')
  t.throws(() => manager.removePlayer(nonExistID), `[removePlayer] Player ID: ${nonExistID} not found.`)
})

test('removePlayer should properly set currentPlayerIndex', t => {
  t.plan(1)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.next()
  const ID = manager.players[0].ID
  manager.removePlayer(ID)

  const actual = manager.currentPlayerIndex
  const expected = -1

  t.equal(actual, expected, 'currentPlayerIndex should minus one when the removed player is current one')
})

test('removePlayer should emit an event', t => {
  t.plan(2)  // addPlayer will also fire an event. 2 Events in total will be fired
  const manager = getManager()
  manager.on(PlayerManagerEvents.PlayerListChanged, () => {
    t.pass('PlayerListChanged event fired')
  })

  manager.addPlayer('John')
  const ID = manager.players[0].ID
  manager.removePlayer(ID)
})

test('next() should get the first player on first call', t => {
  t.plan(2)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const actual = manager.next()
  const expected = manager.players[0].ID

  t.equal(actual, expected, 'The first player ID should be the returned value')
  t.equal(manager.currentPlayerIndex, 0, 'currentPlayerIndex should be 0')
})

test('next() should set zero when the last player have reached', t => {
  t.plan(2)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.next()
  manager.next()
  manager.next()
  const actual = manager.next()
  const expected = manager.players[0].ID

  t.equal(actual, expected, 'The first player ID should be the returned value')
  t.equal(manager.currentPlayerIndex, 0, 'currentPlayerIndex should be 0')
})

test('calcAllScore should update players score on their scoreboard', t => {
  t.plan(3)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.calcAllScore('1')

  for (const player of manager.players) {
    const actual = player.scoreboard.getScore('1')
    const expected = 0

    t.equal(actual, expected, 'Score should be 0')
  }
})

test('calcAllScore should emit an event', t => {
  t.plan(1)
  const manager = getManager()
  manager.on(PlayerManagerEvents.ScoreChanged, () => {
    t.pass('ScoreChanged event fired')
  })

  manager.calcAllScore('1')
})

test('updateRank should update players\' rank property', t => {
  t.plan(1)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const players = manager.players
  players[0].scoreboard.totalScore = 10
  players[1].scoreboard.totalScore = -1
  players[2].scoreboard.totalScore = 10
  manager.updateRank()

  const actual = players.map(p => p.rank)
  const expected = [1, 3, 1]

  t.deepEqual(actual, expected, 'Rank of players should sort accordingly')
})

test('getPlayerByID should return player by ID', t => {
  t.plan(1)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const player = manager.players[0]
  const ID = player.ID

  const actual = manager.getPlayerByID(ID).ID

  t.equal(actual, ID, 'Should return same ID')
})

test('getPlayerByID should return a dummy player when player ID does not exists', t => {
  t.plan(1)
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])

  const actual = manager.getPlayerByID('No exist player ID').name
  const expected = 'Null'

  t.equal(actual, expected, 'Player name should be Null')
})

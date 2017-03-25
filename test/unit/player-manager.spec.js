import test from 'tape'
import {PlayerManager, PlayerManagerEvents} from '../../src/services/game-board/player-manager'

function getManager() {
  return new PlayerManager()
}

test('reset should properly reset player manager states', t => {
  const manager = getManager()

  manager.reset()

  t.equal(manager.players.length, 0, 'Player array should be empty')
  t.equal(manager.currentPlayerIndex, -1, 'Current player index should start from -1')
  t.equal(manager._playerMap.size, 0, 'Player map should be empty')
  t.end()
})

test('addPlayer(name) should work', t => {
  const manager = getManager()

  manager.addPlayer('John')
  const actual = manager.players[0].name
  const expected = 'John'

  t.equal(actual, expected, 'New player named John should be added')
  t.end()
})

test('addPlayer([name, name]) should work', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary'])

  const players = manager.players
  t.equal(players[0].name, 'John', 'First player should named John')
  t.equal(players[1].name, 'Mary', 'Second player should named Mary')
  t.end()
})

test('addPlayer should emit an event', t => {
  const manager = getManager()
  manager.on(PlayerManagerEvents.PlayerListChanged, () => {
    t.pass('PlayerListChanged event fired')
    t.end()
  })

  manager.addPlayer('John')
})

test('removePlayer(ID) should remove him from player list', t => {
  const manager = getManager()
  const players = manager.players

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const ID = players[1].ID
  manager.removePlayer(ID)

  t.equal(players[0].name, 'John', 'First player should named John')
  t.equal(players[1].name, 'Joe', 'Second player should named Joe')
  t.end()
})

test('removePlayer should throw an error when the ID does not exists', t => {
  const manager = getManager()
  const nonExistID = 'This ID should not point to any player'

  manager.addPlayer('John')
  t.throws(() => manager.removePlayer(nonExistID), `[removePlayer] Player ID: ${nonExistID} not found.`)
  t.end()
})

test('removePlayer should properly set currentPlayerIndex', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.next()
  const ID = manager.players[0].ID
  manager.removePlayer(ID)

  const actual = manager.currentPlayerIndex
  const expected = -1

  t.equal(actual, expected, 'currentPlayerIndex should minus one when the removed player is current one')
  t.end()
})

test('removePlayer should emit an event', t => {
  const manager = getManager()
  let eventFired = 0
  manager.on(PlayerManagerEvents.PlayerListChanged, () => {
    eventFired += 1
  })

  manager.addPlayer('John')
  const ID = manager.players[0].ID
  manager.removePlayer(ID)

  t.equal(eventFired, 2, '2 event should be fired in total')
  t.end()
})

test('next() should get the first player on first call', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const actual = manager.next()
  const expected = manager.players[0].ID

  t.equal(actual, expected, 'The first player ID should be the returned value')
  t.equal(manager.currentPlayerIndex, 0, 'currentPlayerIndex should be 0')
  t.end()
})

test('next() should set zero when the last player have reached', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.next()
  manager.next()
  manager.next()
  const actual = manager.next()
  const expected = manager.players[0].ID

  t.equal(actual, expected, 'The first player ID should be the returned value')
  t.equal(manager.currentPlayerIndex, 0, 'currentPlayerIndex should be 0')
  t.end()
})

test('calcAllScore should update players score on their scoreboard', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  manager.calcAllScore('1')

  for (const player of manager.players) {
    const actual = player.scoreboard.getScore('1')
    const expected = 0

    t.equal(actual, expected, 'Score should be 0')
  }
  t.end()
})

test('calcAllScore should emit an event', t => {
  const manager = getManager()
  manager.on(PlayerManagerEvents.ScoreChanged, () => {
    t.pass('ScoreChanged event fired')
    t.end()
  })

  manager.calcAllScore('1')
})

test('updateRank should update players\' rank property', t => {
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

  t.end()
})

test('getPlayerByID should return player by ID', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])
  const player = manager.players[0]
  const ID = player.ID

  const actual = manager.getPlayerByID(ID).ID

  t.equal(actual, ID, 'Should return same ID')
  t.end()
})

test('getPlayerByID should return a dummy player when player ID does not exists', t => {
  const manager = getManager()

  manager.addPlayer(['John', 'Mary', 'Joe'])

  const actual = manager.getPlayerByID('No exist player ID').name
  const expected = 'Null'

  t.equal(actual, expected, 'Player name should be Null')
  t.end()
})

test('dump() should return empty state object for new manager', t => {
  const manager = getManager()

  const actual = manager.dump()
  const expected = {
    players: [],
    currentPlayerIndex: -1
  }

  t.deepEqual(actual, expected, 'Initial state for dumped is expected')
  t.end()
})

test('dump() should return array of players', t => {
  const manager = getManager()

  manager.addPlayer('John')
  const actual = manager.dump()
  const players = actual.players

  t.equal(actual.currentPlayerIndex, -1, 'Dumped should have currentPlayerIndex as -1')
  t.equal(players.length, 1, 'Dumped players should be an array with 1 as length')

  const john = players[0]
  t.equal(john.name, 'John', 'Dumped player should named John')
  t.assert(john.hasOwnProperty('ID'), 'Dumped should have ID property')
  t.assert(john.hasOwnProperty('scoreboard'), 'Dumped should have scoreboard property')
  t.end()
})

test('load() should work fine on empty data', t => {
  const manager = getManager()

  manager.load({
    players: [],
    currentPlayerIndex: -1
  })

  t.equal(manager.players.length, 0, 'Manager should have stored no player')
  t.equal(manager.currentPlayerIndex, -1, 'currentPlayerIndex should be -1')
  t.equal(manager._playerMap.size, 0, 'playerMap should be empty')
  t.end()
})

test('load() should load serialized data properly', t => {
  const manager = getManager()
  const players = [{
    ID: 'zero',
    name: 'John',
    scoreboard: {
      bid: null,
      win: null,
      scores: [['0', -1]]
    }
  }, {
    ID: 'one',
    name: 'Mary',
    scoreboard: {
      bid: null,
      win: null,
      scores: [['1', 10]]
    }
  }]
  const data = {
    currentPlayerIndex: 1,
    players
  }

  manager.load(data)

  const managerPlayers = manager.players
  t.equal(managerPlayers.length, 2, '2 players should be loaded')
  t.equal(manager.currentPlayerIndex, 1, 'currentPlayerIndex should be loaded')
  t.equal(managerPlayers[0].name, 'John', 'First player should name John')
  t.equal(managerPlayers[1].name, 'Mary', 'Second player should name Mary')
  t.equal(managerPlayers[0].rank, 2, 'John should ranked second')
  t.equal(managerPlayers[1].rank, 1, 'Mary should ranked first')
  t.end()
})

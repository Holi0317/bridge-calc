import test from 'tape'
import {MemStorageService} from '../../src/storage/mem-storage-service'

function getStorage() {
  return new MemStorageService()
}

function genMeta(num) {
  return {
    cardPerPlayer: num,
    isExtra: false,
    name: num + '',
    playerOrder: []
  }
}

function getData() {
  return {
    gameBoard: {
      startTime: 1490536225714,
      state: 1
    },
    metas: {
      currentIndex: 0,
      metas: [
        {
          cardPerPlayer: 1,
          isExtra: false,
          maker: '26a5',
          name: '1',
          playerOrder: [
            '26a5',
            '21b9'
          ]
        },
        genMeta(2),
        genMeta(3),
        genMeta(4),
        genMeta(5),
        genMeta(6),
        genMeta(7),
        genMeta(8),
        genMeta(9),
        genMeta(10),
        genMeta(11),
        genMeta(12),
        genMeta(13),
      ]
    },
    players: {
      currentPlayerIndex: 0,
      players: [
        {
          ID: '26a5',
          name: 'John',
          scoreboard: {
            bid: null,
            scores: [],
            win: null
          }
        },
        {
          ID: '21b9',
          name: 'Mary',
          scoreboard: {
            bid: null,
            scores: [],
            win: null
          }
        }
      ]
    },
    timer: {
      timePassed: 1
    }
  }
}

test('initial states', t => {
  const storage = getStorage()

  t.equal(storage.lastIndex, -1, 'Last index should start from -1')
  t.equal(storage.db.size, 0, 'DB Map should be 0 at first')
  t.end()
})

test('addGame() should write new game to database', t => {
  const storage = getStorage()
  const data = getData()
  storage.addGame(data)
    .then(res => {
      t.equal(res, 0, 'ID of the game should start from 0')
      t.equal(storage.db.size, 1, 'DB should store 1 item')
      t.deepEqual(storage.db.get(0), data, 'Stored data should be the one passed in')
      t.end()
    })
})

test('getPrevGames() should return the map', t => {
  const storage = getStorage()
  const data = getData()
  storage.addGame(data)
    .then(() => storage.getPrevGames())
    .then(res => {
      t.equal(res.size, 1, 'Map with 1 as size is expected')
      t.end()
    })
})

test('updateGame() should return false on non-exist game', t => {
  const storage = getStorage()
  storage.updateGame(42)
    .then(res => {
      t.assert(!res, 'Result should be false')
      t.end()
    })
})

test('updateGame() should update memory database base on passed in data', t => {
  const storage = getStorage()
  const data = getData()
  const joe = {
    ID: '10',
    name: 'Joe',
    scoreBoard: {
      bid: null,
      win: null,
      scores: []
    }
  }
  const update = {
    players: {
      players: [joe]
    }
  }
  const expected = getData()
  expected.players.players = [joe]

  storage.addGame(data)
    .then(id => storage.updateGame(id, update))
    .then(res => {
      t.assert(res)
      const actual = storage.db.get(0)
      t.deepEqual(actual, expected, 'Data should update accordingly')
      t.end()
    })
})

test('deleteGame() should return false on non-exist game', t => {
  const storage = getStorage()
  storage.deleteGame(42)
    .then(res => {
      t.assert(!res, 'Result should be false')
      t.end()
    })
})

test('deleteGame() should remove game from database', t => {
  const storage = getStorage()
  const data = getData()
  storage.addGame(data)
    .then(id => storage.deleteGame(id))
    .then(res => {
      t.assert(res, 'Result should be true')
      t.equal(storage.db.size, 0, 'No data should left in DB')
      t.end()
    })
})

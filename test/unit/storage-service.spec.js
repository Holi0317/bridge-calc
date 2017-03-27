import test from 'tape'
import {StorageService} from '../../src/storage/storage-service'
import memoryStorageDriver from 'localforage-memoryStorageDriver'
import localforage from 'localforage'

async function getStorage() {
  const localForage = localforage.createInstance({
    name: 'testing'
  })
  await localForage.defineDriver(memoryStorageDriver)
  await localForage.setDriver(memoryStorageDriver._driver)
  await localForage.clear()
  return new StorageService(localForage)
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

test('getStorage helper function should set memory driver', async t => {
  const storage = await getStorage()
  const lf = storage.localForage
  t.equal(lf.driver(), memoryStorageDriver._driver, 'memory driver should be used')
  t.end()
})

test('addGame() should set LastIndex inside the database', async t => {
  const storage = await getStorage()
  const lf = storage.localForage
  const data = getData()
  await storage.addGame(data)

  const actual = await lf.getItem('LastIndex')
  const expected = 0
  t.equal(actual, expected, 'LastIndex should set to 0 on first call')
  t.end()
})

test('addGame() should use incremental ID', async t => {
  const storage = await getStorage()
  const data = getData()
  const result1 = await storage.addGame(data)
  const result2 = await storage.addGame(data)

  t.equal(result1, 0, '0 as ID for first one')
  t.equal(result2, 1, '1 as ID for second one')
  t.end()
})

test('addGame() should save the entry into database', async t => {
  const storage = await getStorage()
  const lf = storage.localForage
  const data = getData()
  await storage.addGame(data)

  const actual = await lf.getItem('game-0')
  t.deepEqual(actual, data, 'Entry should be saved into database')
  t.end()
})

test('getPrevGames() should return a map with games added', async t => {
  const storage = await getStorage()
  const data = getData()
  const ID = await storage.addGame(data)

  const actual = await storage.getPrevGames()
  t.equal(actual.size, 1, 'The Map should only contains one element')
  t.assert(actual.has(ID), 'The returned Map should contains ID of game just added')
  t.deepEqual(actual.get(ID), data, 'The Map should map ID to data in database')
  t.end()
})

test('updateGame() should return false on non-exist game', async t => {
  const storage = await getStorage()
  const data = getData()

  const actual = await storage.updateGame(42, data)
  const expected = false
  t.equal(actual, expected, 'False should be returned')
  t.end()
})

test('updateGame() should update database base on passed in data', async t => {
  const storage = await getStorage()
  const lf = storage.localForage
  const oldData = getData()
  const ID = await storage.addGame(oldData)
  const newData = getData()
  newData.players.players = [{
    ID: '10',
    name: 'Joe',
    scoreBoard: {
      bid: null,
      win: null,
      scores: []
    }
  }]

  const result = await storage.updateGame(ID, newData)
  t.equal(result, true, 'True should be returned as update should succeed')
  const dataInDB = await lf.getItem('game-0')
  t.deepEqual(dataInDB, newData, 'Data should be updated in database')
  t.end()
})

test('deleteGame() should return false on non-exist game', async t => {
  const storage = await getStorage()

  const actual = await storage.deleteGame(42)
  const expected = false
  t.equal(actual, expected, 'False should be returned')
  t.end()
})

test('deleteGame() should remove game from database', async t => {
  const storage = await getStorage()
  const lf = storage.localForage
  const data = getData()
  const ID = await storage.addGame(data)

  const result = await storage.deleteGame(ID)
  t.equal(result, true, 'True should be returned as deletion should succeed')
  const dataInDB = await lf.getItem('game-0')
  t.equal(dataInDB, undefined, 'Data should be removed from database')
  t.end()
})

import test from 'tape'
import {Timer} from '../../src/services/game-board/timer'

function getTimer() {
  return new Timer()
}

test('getTimeUsed() should be 0 on new Timer object', t => {
  const timer = getTimer()
  t.equal(timer.getTimeUsed(), 0, '0 is expected')
  t.end()
})

test('startTimer() should start timer counting', t => {
  const timer = getTimer()
  timer.startTimer()
  setTimeout(() => {
    t.assert(timer.getTimeUsed() > 0, 'Time should have passed')
    t.end()
  }, 1)
})

test('endTimer() should stop counting time', t => {
  const timer = getTimer()
  timer.startTimer()
  timer.endTimer()

  const timeUsed = timer.getTimeUsed()
  setTimeout(() => {
    t.equal(timer.getTimeUsed(), timeUsed, 'Time used should not change after end')
    t.end()
  }, 1)
})

test('dump() should dump data', t => {
  const timer = getTimer()
  const actual = timer.dump()
  const expected = {
    timePassed: 0
  }
  t.deepEqual(actual, expected, 'Dumped data structure is expected')
  t.end()
})

test('load() should load in time passed', t => {
  const timer = getTimer()
  const data = {
    timePassed: 1000
  }
  timer.load(data)

  t.equal(timer._timePassed, 1000, 'time passed should be the same as the one passed in')
  t.end()
})

test('getTimeUsed() should consider loaded in time passed data', t => {
  const timer = getTimer()
  const data = {
    timePassed: 1000
  }
  timer.load(data)
  timer.startTimer()

  setTimeout(() => {
    t.assert(timer.getTimeUsed() > 1000, 'time passed should be larger than 1000')
    t.end()
  }, 1)
})

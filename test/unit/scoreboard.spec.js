import * as test from 'tape'
import {Scoreboard} from '../../src/services/game-board/scoreboard'

function getScoreboard() {
  return new Scoreboard()
}

test('reset() should reset its state', t => {
  t.plan(5)
  const scoreboard = getScoreboard()
  scoreboard.reset()

  t.equal(scoreboard.bid, null, 'Bid should default to null')
  t.equal(scoreboard.win, null, 'Win should default to null')
  t.equal(scoreboard._scores.size, 0, 'Scores map should have nothing in it')
  t.equal(scoreboard.prevScore, 0, 'Score from last round should be 0')
  t.equal(scoreboard.totalScore, 0, 'Total score should be 0')
})

test('calcScore() should set 0 mark when both bid and win are null', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', null, null)

  const actual = scoreboard.getScore('1')
  const expected = 0
  t.equal(actual, expected, '0 mark is expected')
})

test("calcScore('1', 0, 0) should set 10 mark", t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 0)

  const actual = scoreboard.getScore('1')
  const expected = 10
  t.equal(actual, expected, '10 mark is expected')
})

test("calcScore('1', 0, 1) should set -1 mark", t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 1)

  const actual = scoreboard.getScore('1')
  const expected = -1
  t.equal(actual, expected, '-1 mark is expected')
})

test('calcScore() should use implicit parameters', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.bid = 0
  scoreboard.win = 1
  scoreboard.calcScore('1')

  const actual = scoreboard.getScore('1')
  const expected = -1
  t.equal(actual, expected, '-1 mark is expected')
})

test('calcScore() should update total score', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 1)
  scoreboard.calcScore('2', 0, 1)

  const actual = scoreboard.totalScore
  const expected = -2
  t.equal(actual, expected, '-2 mark is expected')
})

test('calcScore() should update prev score', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 1)
  scoreboard.calcScore('2', 0, 0)

  const actual = scoreboard.prevScore
  const expected = 10
  t.equal(actual, expected, '10 mark is expected')
})

test('getScore() on non-exist round should return null', t => {
  t.plan(1)
  const scoreboard = getScoreboard()

  const actual = scoreboard.getScore('non-exist-round')
  const expected = null
  t.equal(actual, expected, 'null is expected to return')
})

test('updateTotalScore() should update total score', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 0)
  scoreboard.calcScore('2', 1, 1)
  scoreboard.updateTotalScore()

  const actual = scoreboard.totalScore
  const expected = 21
  t.equal(actual, expected, '21 mark is expected')
})

test('dump() should dump new scoreboard object', t => {
  t.plan(1)
  const scoreboard = getScoreboard()

  const actual = scoreboard.dump()
  const expected = {
    bid: null,
    scores: [],
    win: null
  }
  t.deepEqual(actual, expected, 'Dumped should be default')
})

test('dump() should return bid and win properties', t => {
  t.plan(2)
  const scoreboard = getScoreboard()
  scoreboard.bid = 0
  scoreboard.win = 1

  const actual = scoreboard.dump()
  t.equal(actual.bid, 0, '0 bid should be dumped')
  t.equal(actual.win, 1, '1 win should be dumped')
})

test('dump() should dump scores', t => {
  t.plan(1)
  const scoreboard = getScoreboard()
  scoreboard.calcScore('1', 0, 0)
  scoreboard.calcScore('2', 1, 1)

  const actual = scoreboard.dump().scores
  const expected = [['1', 10], ['2', 11]]
  t.deepEqual(actual, expected, 'Score map is expected')
})

test('load() should load default state', t => {
  t.plan(5)
  const scoreboard = getScoreboard()
  const data = {
    bid: null,
    scores: [],
    win: null
  }
  scoreboard.load(data)

  t.equal(scoreboard.bid, null, 'Bid should be null')
  t.equal(scoreboard.win, null, 'Win should be null')
  t.equal(scoreboard._scores.size, 0, 'Scores should contains nothing')
  t.equal(scoreboard.prevScore, 0, 'Previous score should be 0')
  t.equal(scoreboard.totalScore, 0, 'Total score should be 0')
})

test.skip('load() should load sample state', t => {
  t.plan(7)
  const scoreboard = getScoreboard()
  const data = {
    bid: 1,
    scores: [['1', 10], ['2', -1]],
    win: 0
  }
  scoreboard.load(data)

  t.equal(scoreboard.bid, 1, 'Bid should be 1')
  t.equal(scoreboard.win, 0, 'Win should be 0')
  t.equal(scoreboard._scores.size, 2, '2 score entry should exist')
  t.equal(scoreboard.prevScore, -1, '-1 should be the score of previous round')
  t.equal(scoreboard.totalScore, 9, 'Total score should be 9')
  t.equal(scoreboard.getScore('1'), 10, 'Round 1 should score 10 mark')
  t.equal(scoreboard.getScore('2'), -1, 'Round 2 should score -1 mark')
})

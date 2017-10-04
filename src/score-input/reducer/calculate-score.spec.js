import {calculateScore} from './calculate-score'

test('it should calculate for correct guess', () => {
  const bid = 0
  const win = 0
  const expected = 10
  const actual = calculateScore(bid, win)
  expect(actual).toEqual(expected)
})

test('it should calculate for incorrect guess', () => {
  const bid = 1
  const win = 0
  const expected = -1
  const actual = calculateScore(bid, win)
  expect(actual).toEqual(expected)
})

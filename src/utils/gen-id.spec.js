import {genID} from './gen-id'

test('genID generate unique ID', () => {
  const first = genID()
  const second = genID()

  expect(first).not.toBe(second)
})

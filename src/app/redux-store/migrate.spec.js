import {migrations} from './migrations'

describe('v1 to v2', () => {
  const migrate = migrations[2]

  test('Migration should reset theme property', () => {
    const oldState = {
      theme: {
        theme: 'default'
      }
    }
    const expected = {
      theme: {
        theme: 'Pink',
        dark: false
      }
    }
    const actual = migrate(oldState)
    expect(actual).toEqual(expected)
  })
})

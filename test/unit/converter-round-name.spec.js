import test from 'tape'
import {GameMeta} from '../../src/services/game-board/game-meta'
import {RoundNameValueConverter} from '../../src/converters/round-name-format'

const converter = new RoundNameValueConverter()

test('show extra round', t => {
  t.plan(1)
  const meta = new GameMeta('xtra')
  meta.cardPerPlayer = 10

  const actual = converter.toView(meta)
  const expected = 'xtra (10)'
  t.equal(actual, expected, 'Round name should be in extra format')
})

test('show normal round', t => {
  t.plan(1)
  const meta = new GameMeta(1)

  const actual = converter.toView(meta)
  const expected = 'Round 1'
  t.equal(actual, expected, 'Round name should be Round 1')
})

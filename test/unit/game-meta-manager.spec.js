import './setup';
import test from 'tape';
import {Container} from 'aurelia-dependency-injection';
import {GameMetaManager} from '../../src/services/game-board/game-meta-manager';

function getManager() {
  const container = new Container();
  return container.get(GameMetaManager);
}

test('getAllMetas should return empty list when not started', t => {
  t.plan(1);

  const manager = getManager();

  const actual = manager.getAllMetas().length;
  const expected = 0;

  t.equal(actual, expected, 'Empty array is expected');
});

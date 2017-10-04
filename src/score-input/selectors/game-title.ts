import {createSelector} from 'reselect'
import {stageSelector} from './stage'
import {currentRoundSelector} from './current-round'
import {roundsSelector} from './rounds'
import {GameStage} from '../game-stage'

import {IRootState, I18nT} from '../../types'

/**
 * Compute title to be displayed on app bar for current game.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const gameTitleSelector = createSelector(
  stageSelector,
  currentRoundSelector,
  roundsSelector,
  (state: IRootState, t: I18nT) => t,
  (stage: GameStage | null, currentRound: number | null, rounds: number | null, t: I18nT): string => {
    if (stage == null) {
      return ''
    } else if (stage === GameStage.waitingBid || stage === GameStage.waitingWin) {
      return t('Round {{currentRound}} of {{rounds}}', {currentRound, rounds})
    } else if (stage === GameStage.ended) {
      return t('Game over')
    } else {
      return ''
    }
  }
)
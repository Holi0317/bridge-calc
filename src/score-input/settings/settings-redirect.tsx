import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {returntypeof} from 'react-redux-typescript'
import {GameStage} from '../game-stage'
import {IRootState} from '../../types'

const mapStateToProps = (state: IRootState) => ({
  shouldRedirect: state.currentGame && state.currentGame.stage === GameStage.ended
})

const stateType = returntypeof(mapStateToProps)

type SettingsRedirectProps = typeof stateType

export function SettingsRedirectImpl({shouldRedirect}: SettingsRedirectProps) {
  return shouldRedirect ? <Redirect to="/score-input/scoreboard" /> : null
}

export const SettingsRedirect = connect(mapStateToProps)(SettingsRedirectImpl)

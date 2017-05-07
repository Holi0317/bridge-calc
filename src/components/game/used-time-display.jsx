// @flow
import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import utilsCSS from '../../utils.css'

import type {T} from '../../types'

function msToTime(milliseconds: number) {
  // Get hours from milliseconds
  const hours = milliseconds / (1000 * 60 * 60)
  const absoluteHours = Math.floor(hours)
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60
  const absoluteMinutes = Math.floor(minutes)
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60
  const absoluteSeconds = Math.floor(seconds)
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

  return `${h}:${m}:${s}`
}

class DisconnectUsedTimeDisplay extends Component {
  _timerID: ?number
  props: {
    startTime: ?Date,
    endTime: ?Date,
    t: T
  }
  state: {
    time: string
  }

  constructor(props) {
    super(props)
    this.state = {
      time: '00:00:00'
    }
  }

  componentWillMount() {
    if (this._timerID) {
      clearInterval(this._timerID)
    }
    this._timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    if (this._timerID) {
      clearInterval(this._timerID)
      this._timerID = null
    }
  }

  tick = () => {
    this.setState(() => ({
      time: this.calcTime()
    }))
  }

  calcTime() {
    const {startTime, endTime} = this.props
    if (!startTime) {
      // Not started
      return '00:00:00'
    }
    const largerTime = endTime ? endTime : new Date()
    return msToTime(largerTime.getTime() - startTime.getTime())
  }

  render() {
    const {t} = this.props
    const {time} = this.state
    return <span className={utilsCSS.pullRight}>{t('Time: {{time}}', {time})}</span>
  }
}

function mapStateToProps(state) {
  return {
    startTime: state.currentGame.startTime || null,
    endTime: state.currentGame.endTime || null
  }
}

export const UsedTimeDisplay = translate()(connect(mapStateToProps)(DisconnectUsedTimeDisplay))

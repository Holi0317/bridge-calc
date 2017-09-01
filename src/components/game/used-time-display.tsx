import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import {IRootState, ITranslateMixin} from '../../types'
import {endTimeSelector, startTimeSelector} from '../../selectors/current-game/time'
import utilsCSS from '../../styles/utils.css'

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

const mapStateToProps = (state: IRootState) => ({
  startTime: startTimeSelector(state),
  endTime: endTimeSelector(state)
})

const stateType = returntypeof(mapStateToProps)

class UsedTimeDisplayImpl extends React.Component {
  public props: typeof stateType & ITranslateMixin
  public state = {
    time: '00:00:00'
  }
  private timerID: number | null

  public componentWillMount() {
    if (this.timerID) {
      window.clearInterval(this.timerID)
    }
    this.timerID = window.setInterval(this.tick, 1000)
    this.tick()
  }

  public componentWillUnmount() {
    if (this.timerID) {
      window.clearInterval(this.timerID)
      this.timerID = null
    }
  }

  public render() {
    const {t} = this.props
    const {time} = this.state
    return <span className={utilsCSS.pullRight}>{t('Time: {{time}}', {time})}</span>
  }

  private tick = () => {
    this.setState(() => ({
      time: this.calcTime()
    }))
  }

  private calcTime() {
    const {startTime, endTime} = this.props
    if (!startTime) {
      // Not started
      return '00:00:00'
    }
    const largerTime = endTime ? endTime : new Date()
    return msToTime(largerTime.getTime() - startTime.getTime())
  }
}

export const UsedTimeDisplay = flowRight(
  translate(),
  connect(mapStateToProps)
)(UsedTimeDisplayImpl)

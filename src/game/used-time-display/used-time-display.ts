import {autoinject} from 'aurelia-framework'
import bind from 'autobind-decorator'
import {GameBoardManager} from '../../services/game-board/game-board-manager'

function msToTime(milliseconds: number) {
  // Get hours from milliseconds
  const hours = milliseconds / (1000 * 60 * 60)
  const absoluteHours = Math.floor(hours)
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60
  const absoluteMinutes = Math.floor(minutes)
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60
  const absoluteSeconds = Math.floor(seconds)
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

  return `${h}:${m}:${s}`
}

@autoinject()
export class UsedTimeDisplay {
  public usedTime: string
  private _intervalID: number | null

  constructor(private _gameBoardManager: GameBoardManager) {
    this._intervalID = null
    this.usedTime = '00:00:00'
  }

  public attached() {
    if (!this._intervalID) {
      this._intervalID = window.setInterval(this.tick)
    }
  }

  public detached() {
    if (this._intervalID) {
      window.clearInterval(this._intervalID)
    }
  }

  @bind
  public tick() {
    const currentGame = this._gameBoardManager.currentGame
    if (currentGame) {
      const delta = currentGame.timer.getTimeUsed()
      this.usedTime = msToTime(delta)
    }
  }
}

import {ITimerSchema} from '../../storage/schema'

export class Timer {
  public static fromDumped(data: ITimerSchema) {
    const timer = new Timer()
    timer._startTime = null
    timer._timePassed = data.timePassed
    return timer
  }

  public _startTime: Date | null = null
  private _timePassed = 0

  public startTimer() {
    this._startTime = new Date()
  }

  public endTimer() {
    this._timePassed = this.getTimeUsed()
    this._startTime = null
  }

  public getTimeUsed(): number {
    const now = new Date().getTime()
    const delta = this._startTime ? now - this._startTime.getTime() : 0
    return this._timePassed + delta
  }

  public dump(): ITimerSchema {
    return {
      timePassed: this.getTimeUsed()
    }
  }
}

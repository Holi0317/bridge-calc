import {ITimerSchema} from '../../storage/schema'

export class Timer {
  public startTime: Date | null = null
  public endTime: Date | null = null

  public startTimer() {
    this.startTime = new Date()
  }

  public endTimer() {
    this.endTime = new Date()
  }

  public getTimeUsed(): number {
    if (this.startTime && this.endTime) {
      return this.endTime.getTime() - this.startTime.getTime()
    } else if (this.startTime) {
      const now = new Date()
      return now.getTime() - this.startTime.getTime()
    } else {
      return 0
    }
  }

  public dump(): ITimerSchema {
    function getTimeOrNull(date: Date | null): number | null {
      return date ? date.getTime() : null
    }

    return {
      endTime: getTimeOrNull(this.endTime),
      startTime: getTimeOrNull(this.startTime)
    }
  }

  public load(data: ITimerSchema) {
    function dateOrNull(date: number | null): Date | null {
      return date ? new Date(date) : null
    }

    this.startTime = dateOrNull(data.startTime)
    this.endTime = dateOrNull(data.endTime)

  }
}

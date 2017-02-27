export class Timer {
  public startTime: Date | null = null;
  public endTime: Date | null = null;

  constructor() {

  }

  startTimer() {
    this.startTime = new Date();
  }

  endTimer() {
    this.endTime = new Date();
  }

  getTimeUsed(): number {
    if (this.startTime && this.endTime) {
      return this.endTime.getTime() - this.startTime.getTime();
    } else if (this.startTime) {
      const now = new Date();
      return now.getTime() - this.startTime.getTime();
    } else {
      return 0;
    }
  }

  dump(): TimerSchema {
    function getTimeOrNull(date: Date | null): number | null {
      return date ? date.getTime() : null;
    }

    return {
      startTime: getTimeOrNull(this.startTime),
      endTime: getTimeOrNull(this.endTime)
    }
  }

  load(data: TimerSchema) {
    function dateOrNull(date: number | null): Date | null {
      return date ? new Date(date) : null;
    }

    this.startTime = dateOrNull(data.startTime);
    this.endTime = dateOrNull(data.endTime);

  }
}

export interface TimerSchema {
  startTime: number | null
  endTime: number | null
}

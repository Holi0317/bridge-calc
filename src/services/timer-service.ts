export class TimerService {
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
}

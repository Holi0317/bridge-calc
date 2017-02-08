import {autoinject} from 'aurelia-framework';
import {GameService} from '../../services/game-service';

function msToTime(milliseconds: number){
  //Get hours from milliseconds
  let hours = milliseconds / (1000*60*60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  let seconds = (minutes - absoluteMinutes) * 60;
  let absoluteSeconds = Math.floor(seconds);
  let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  return h + ':' + m + ':' + s;
}

@autoinject()
export class UsedTimeDisplay {
  intervalID: number | null;
  usedTime: string;

  constructor(private _gameService: GameService) {
    this.tick = this.tick.bind(this);
    this.intervalID = null;
    this.usedTime = '00:00';
  }

  attached() {
    if (!this.intervalID) {
      this.intervalID = window.setInterval(this.tick);
    }
  }

  detached() {
    if (this.intervalID) {
      window.clearInterval(this.intervalID);
    }
  }

  tick() {
    if (!this._gameService.startTime) {
      this.usedTime = '00:00';
      return
    }
    let now = new Date();
    if (this._gameService.endTime) {
      now = this._gameService.endTime;
    }

    const delta = now.getTime() - this._gameService.startTime.getTime();

    this.usedTime = msToTime(delta);
  }
}

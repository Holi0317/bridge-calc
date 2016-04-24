import {Injectable} from 'angular2/core';

@Injectable()
export class BufferService {
  public guessBuffer: number[] = [];
  public actualBuffer: number[] = [];

  reset() {
    this.guessBuffer = [];
    this.actualBuffer = [];
  }
}

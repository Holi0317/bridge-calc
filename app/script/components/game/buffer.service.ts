import { Injectable } from '@angular/core';

@Injectable()
export class BufferService {
  public guessBuffer: number[] = [];
  public actualBuffer: number[] = [];

  reset() {
    this.guessBuffer = [];
    this.actualBuffer = [];
  }
}

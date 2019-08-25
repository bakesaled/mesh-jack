import { Injectable } from '@angular/core';
import { BusMessage } from '../../../bus/src/lib';

@Injectable({
  providedIn: 'root'
})
export class MessageLogService {
  constructor() {}

  public addMessage(message: BusMessage) {
    console.log('message', message);
  }
}

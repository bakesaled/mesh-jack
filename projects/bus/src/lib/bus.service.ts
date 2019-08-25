import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BusMessage } from './bus-message';

@Injectable()
export class BusService {
  constructor() {}
  private channels: Map<string, Subject<BusMessage>> = new Map<
    string,
    Subject<BusMessage>
  >();

  public channel(key: string): Observable<BusMessage> {
    if (!this.channels.has(key)) {
      this.channels.set(key, new Subject<BusMessage>());
    }
    return this.channels.get(key).asObservable();
  }

  publish(channelKey: string, message: BusMessage) {
    if (this.channels.has(channelKey)) {
      this.channels.get(channelKey).next(message);
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BusMessage } from './bus-message';

@Injectable()
export class BusService {
  private channels: Map<string, Subject<BusMessage>> = new Map<
    string,
    Subject<BusMessage>
  >();

  public debug: boolean;

  constructor() {}

  public channel(key: string): Observable<BusMessage> {
    if (!this.channels.has(key)) {
      this.channels.set(key, new Subject<BusMessage>());

      if (this.debug) {
        this.outputDebugChannelInfo(key);
      }
    }
    return this.channels.get(key).asObservable();
  }

  publish(channelKey: string, message: BusMessage) {
    if (this.channels.has(channelKey)) {
      this.channels.get(channelKey).next(message);
    } else if (this.debug) {
      console.debug('channel does not exist', channelKey);
    }
  }

  private outputDebugChannelInfo(key: string) {
    console.debug('new channel added', key);
    const debugChannelKeys: string[] = [];
    this.channels.forEach((value, key) => {
      debugChannelKeys.push(key);
    });
    console.debug('channels', debugChannelKeys);
  }
}

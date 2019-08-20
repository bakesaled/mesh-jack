import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BusService {
  constructor() {}
  private channels: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  public channel<T>(key: string): Observable<T> {
    if (!this.channels.has(key)) {
      this.channels.set(key, new Subject<T>());
    }
    return this.channels.get(key).asObservable();
  }

  publish<T>(channelKey: string, data: T) {
    if (this.channels.has(channelKey)) {
      this.channels.get(channelKey).next(data);
    }
  }
}

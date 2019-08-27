import { TestBed } from '@angular/core/testing';

import { BusService } from './bus.service';
import { Subject } from 'rxjs';
import { BusMessage } from './bus-message';

class MockMessage implements BusMessage {
  constructor(public source: any, public data: any) {}
}

describe('BusService', () => {
  let service: BusService;

  describe('as an injectable service', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BusService]
      });
      service = TestBed.get(BusService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not publish if channel does not exist', () => {
      const spy = jest.spyOn(service['channels'], 'get');
      service.publish('test channel', new MockMessage(this, ''));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should return channel', () => {
      const subj = new Subject<MockMessage>();
      const result = service.channel('test channel');
      expect(result).toEqual(subj.asObservable());
    });
  });
});

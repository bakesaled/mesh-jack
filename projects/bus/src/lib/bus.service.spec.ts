import { TestBed } from '@angular/core/testing';

import { BusService } from './bus.service';
import { Subject } from 'rxjs';

describe('BusService', () => {
  let service: BusService;

  describe('as an injectable service', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BusService]
      });
      service = TestBed.get(BusService);
      service.debug = false;
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not publish if channel does not exist', () => {
      const spy = jest.spyOn(service['channels'], 'get');
      service.publish('test channel', {
        source: this,
        type: 'test event',
        data: 'test data'
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('should return channel', () => {
      const subj = new Subject();
      const result = service.channel('test channel');
      expect(result).toEqual(subj.asObservable());
    });

    it('should log channel info when in debug mode', () => {
      service.debug = true;
      const spy = jest.spyOn(console, 'debug');
      service.channel('test channel');
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should log attempt to publish to nonexistent when in debug mode', () => {
      service.debug = true;
      const spy = jest.spyOn(console, 'debug');
      service.publish('i do not exist', {
        source: this,
        type: ''
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});

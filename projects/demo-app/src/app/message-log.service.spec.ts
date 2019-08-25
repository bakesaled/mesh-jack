import { TestBed } from '@angular/core/testing';

import { MessageLogService } from './message-log.service';

describe('MessageLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageLogService = TestBed.get(MessageLogService);
    expect(service).toBeTruthy();
  });
});

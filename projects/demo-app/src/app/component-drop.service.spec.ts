import { TestBed } from '@angular/core/testing';

import { ComponentDropService } from './component-drop.service';

describe('ComponentDropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentDropService = TestBed.get(ComponentDropService);
    expect(service).toBeTruthy();
  });
});

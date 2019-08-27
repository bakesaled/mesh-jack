import { TestBed } from '@angular/core/testing';

import { SvgService } from './svg.service';

class DOMPoint {
  constructor(public x: number, public y: number) {}
  matrixTransform() {
    return new DOMPoint(100, 50);
  }
}

class MockSvgElement {
  viewportElement = {
    getScreenCTM: () => {
      return {
        inverse: () => 6
      };
    },
    createSVGPoint: () => {
      return new DOMPoint(50, 100);
    }
  };
}

describe('SvgService', () => {
  let service: SvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get svg point', () => {
    const el = new MockSvgElement();
    const result = service.getSVGPoint(new MouseEvent('mousedown'), el);
    expect(result).toEqual(new DOMPoint(100, 50));
  });
});

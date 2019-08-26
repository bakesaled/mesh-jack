import { DroppableDirective } from './droppable.directive';
import { SvgService } from './svg.service';
import { BusService } from '../../../bus/src/lib';

describe('DroppableDirective', () => {
  let directive: DroppableDirective;
  let busService: BusService;
  let svgService: SvgService;

  beforeEach(() => {
    busService = new BusService();
    svgService = new SvgService();
    directive = new DroppableDirective(svgService, busService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set position of elements', () => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    g.append(circle);
    g.append(text);

    directive['setPosition'](g, { x: 5, y: 7 });

    expect(circle.getAttribute('cx')).toBe('5');
    expect(circle.getAttribute('cy')).toBe('7');
    expect(text.getAttribute('x')).toBe('5');
    expect(text.getAttribute('y')).toBe('7');
  });
});

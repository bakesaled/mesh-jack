import { SelectableDirective } from './selectable.directive';
import { BusService } from '../../../bus/src/lib';

describe('SelectableDirective', () => {
  let directive: SelectableDirective;
  let busService: BusService;

  beforeEach(() => {
    busService = new BusService();
    directive = new SelectableDirective(busService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return true if element was dragged', () => {
    directive['dragStartCoords'] = { x: 5, y: 1 };
    const event: any = {
      x: 4,
      y: 6
    };
    const result = directive['elementWasDragged'](event);
    expect(result).toBeTruthy();
    expect(directive['dragStartCoords']).toBeUndefined();
  });

  it('should set drag coords if draggable', () => {
    expect(directive['dragStartCoords']).toBeUndefined();
    const event: any = {
      x: 4,
      y: 6,
      target: {
        getAttribute: () => true
      }
    };
    directive.onMouseDown(event);

    expect(directive['dragStartCoords']).toEqual({ x: 4, y: 6 });
  });

  it('should return true if element is selected', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('stroke', 'blue');
    expect(directive['elementSelected'](el)).toBeTruthy();
  });

  it('should return parent id if element has no id', () => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', 'foo');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    g.append(circle);
    expect(directive['getNearestElementId'](circle)).toBe('foo');
  });

  it('should set element as selected', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.id = 'hulk';
    directive['setSelected'](el, true);
    expect(el.getAttribute('stroke')).toBe('blue');
    expect(el.getAttribute('stroke-width')).toBe('5px');

    directive['setSelected'](el, false);
    expect(el.getAttribute('stroke')).toBe('black');
    expect(el.getAttribute('stroke-width')).toBe('1px');
  });

  it('should unselect all elements', () => {
    const circle1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle1.id = 'the';
    directive['setSelected'](circle1, true);
    const circle2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle2.id = 'hulk';
    directive['setSelected'](circle2, true);
    document.body.append(circle1);
    document.body.append(circle2);

    directive['unSelectAll']();
    expect(circle1.getAttribute('stroke')).toBe('black');
    expect(circle1.getAttribute('stroke-width')).toBe('1px');
    expect(circle2.getAttribute('stroke')).toBe('black');
    expect(circle2.getAttribute('stroke-width')).toBe('1px');
  });
});

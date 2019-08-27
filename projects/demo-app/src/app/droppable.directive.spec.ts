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

    directive['setPosition'](text, { x: 4, y: 8 });
    expect(circle.getAttribute('cx')).toBe('4');
    expect(circle.getAttribute('cy')).toBe('8');
    expect(text.getAttribute('x')).toBe('4');
    expect(text.getAttribute('y')).toBe('8');

    directive['setPosition'](circle, { x: 3, y: 9 });
    expect(circle.getAttribute('cx')).toBe('3');
    expect(circle.getAttribute('cy')).toBe('9');
    expect(text.getAttribute('x')).toBe('3');
    expect(text.getAttribute('y')).toBe('9');
  });

  it('should set position and publish event on drop', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    g.append(circle);
    g.append(text);
    g.setAttribute('id', 'hulk');
    document.body.append(svg);
    document.body.append(g);
    const event: any = {
      preventDefault: () => undefined,
      target: svg,
      dataTransfer: {
        setData: () => undefined,
        getData: () => 'hulk'
      }
    };
    const spyPub = spyOn(directive['busService'], 'publish');
    const spySetPos = spyOn(<any>directive, 'setPosition');
    spyOn(directive['svgService'], 'getSVGPoint').and.callFake(() => {
      return { x: 5, y: 7 };
    });
    directive.onDrop(event);
    expect(spySetPos).toHaveBeenCalled();
    expect(spyPub).toHaveBeenCalled();
  });

  it('should set position and publish event on drag', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    g.append(circle);
    g.setAttribute('id', 'hulk');
    const event: any = {
      preventDefault: () => undefined,
      target: svg,
      dataTransfer: {
        setData: () => undefined,
        getData: () => 'hulk'
      }
    };
    const spyPub = spyOn(directive['busService'], 'publish');
    const spySetPos = spyOn(<any>directive, 'setPosition');
    spyOn(directive['svgService'], 'getSVGPoint').and.callFake(() => {
      return { x: 5, y: 7 };
    });
    directive['draggingElement'] = circle;
    directive.onMouseMove(event);
    expect(spySetPos).toHaveBeenCalled();
    expect(spyPub).toHaveBeenCalled();
  });

  it('should set draggingElement on mousedown', () => {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('draggable', 'true');
    const event: any = {
      target: circle
    };
    directive.onMouseDown(event);
    expect(directive['draggingElement']).toBe(circle);
  });

  it('should set draggingElement to null on mouseleave and mouseup', () => {
    directive['draggingElement'] = 'something';
    directive.onMouseLeave();
    expect(directive['draggingElement']).toBeNull();

    directive['draggingElement'] = 'else';
    directive.onMouseUp();
    expect(directive['draggingElement']).toBeNull();
  });
});

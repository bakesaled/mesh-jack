import { LinkableDirective } from './linkable.directive';
import { BusService } from '../../../bus/src/lib';

describe('LinkableDirective', () => {
  let directive: LinkableDirective;
  let busService: BusService;

  beforeEach(() => {
    busService = new BusService();
    directive = new LinkableDirective(busService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should build line id base on selected directives', () => {
    directive['selectedComponents'].push(<any>{
      id: 'the'
    });
    directive['selectedComponents'].push(<any>{
      id: 'hulk'
    });
    expect(directive['getLineIdFromSelectedComponents']()).toBe(
      'line-the-hulk'
    );
  });

  it('should position line based on start and end components', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const lineId = 'line-startId-endId';
    line.setAttribute('id', lineId);
    svg.append(line);
    document.body.append(svg);

    let directiveModel: any = {
      id: 'startId',
      x: 3,
      y: 4
    };
    directive['positionLine'](lineId, directiveModel);
    expect(line.getAttribute('x1')).toBe('3');
    expect(line.getAttribute('y1')).toBe('4');

    directiveModel = {
      id: 'endId',
      x: 5,
      y: 6
    };
    directive['positionLine'](lineId, directiveModel);
    expect(line.getAttribute('x2')).toBe('5');
    expect(line.getAttribute('y2')).toBe('6');
  });
});

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

  it('should clear', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    svg.append(circle);
    svg.append(line);

    directive['clear'](svg);
    expect(svg.getElementsByTagName('line').length).toBe(0);
    expect(svg.getElementsByTagName('circle').length).toBe(1);
  });

  it('should link', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    directive['selectedComponents'].push(<any>{
      id: 'the',
      x: 1,
      y: 2
    });
    directive['selectedComponents'].push(<any>{
      id: 'hulk',
      x: 3,
      y: 4
    });
    const spyPublish = jest.spyOn(directive['busService'], 'publish');
    const spyDrawLine = jest.spyOn(<any>directive, 'drawLine');
    directive['link'](svg);
    expect(spyPublish).toHaveBeenCalled();
    expect(spyDrawLine).toHaveBeenCalledWith(svg);
  });

  it('should unlink', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', 'line-the-hulk');
    directive['selectedComponents'].push(<any>{
      id: 'the',
      x: 1,
      y: 2
    });
    directive['selectedComponents'].push(<any>{
      id: 'hulk',
      x: 3,
      y: 4
    });
    svg.append(line);
    document.body.append(svg);
    directive['lines'].push('line-the-hulk');
    directive['link'](svg);
    expect(svg.childNodes.length).toBe(0);
    expect(directive['lines'].length).toBe(0);
  });

  it('should draw a line', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    directive['selectedComponents'].push(<any>{
      id: 'the',
      x: 1,
      y: 2
    });
    directive['selectedComponents'].push(<any>{
      id: 'hulk',
      x: 3,
      y: 4
    });
    document.body.append(svg);
    directive['drawLine'](svg);
    expect(directive['lines'].length).toBe(1);
    const line = document.getElementById('line-the-hulk');
    expect(line).not.toBeNull();
    expect(line.getAttribute('stroke-width')).toBe('5');
  });

  it('should position line on element drag', () => {
    const spy = jest.spyOn(<any>directive, 'positionLine');
    directive['lines'].push('line-the-hulk');
    directive.ngOnInit();
    directive['busService'].publish('droppable', {
      source: this,
      data: { event: 'mousemove', component: { id: 'hulk' } }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should add new selected component', () => {
    directive.ngOnInit();
    directive['busService'].publish('selectable', {
      source: this,
      data: { event: 'selected', selected: true, component: { id: 'hulk' } }
    });
    expect(directive['selectedComponents'].length).toBe(1);
  });

  it('should clear on canvas clear message received', () => {
    const spy = jest.spyOn(<any>directive, 'clear');
    directive.ngOnInit();
    directive['busService'].publish('canvas', {
      source: this,
      data: { event: 'clear' }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should link on canvas link message received', () => {
    const spy = jest.spyOn(<any>directive, 'link');
    directive.ngOnInit();
    directive['busService'].publish('canvas', {
      source: this,
      data: { event: 'link' }
    });
    expect(spy).toHaveBeenCalled();
  });
});

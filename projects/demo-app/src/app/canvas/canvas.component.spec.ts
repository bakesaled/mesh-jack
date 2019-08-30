import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './canvas.component';
import { FactoryComponent } from '../factory/factory.component';
import { BusService } from '../../../../bus/src/lib';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent, FactoryComponent],
      imports: [NoopAnimationsModule, DragDropModule],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should clear canvas and object trackers', () => {
    component.components.push({
      id: 'foo',
      x: 5,
      y: 3
    });
    const svg = document.getElementsByTagName('svg');
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    svg[0].append(circle);
    expect(svg[0].childElementCount).toBe(2);

    component['clear']();
    expect(svg[0].childElementCount).toBe(1);
    expect((svg[0].firstChild as SVGElement).localName).toBe('defs');
    expect(component.components.length).toBe(0);
  });

  it('should add new component on drop message', () => {
    component['busService'].publish('droppable', {
      source: this,
      type: 'drop',
      data: { component: { id: 'hulk' } }
    });
    expect(component.components.length).toBe(1);
  });

  it('should publish unselectAll message on link-complete message', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component['busService'].publish('linkable', {
      source: this,
      type: 'link-complete'
    });
    expect(spy).toHaveBeenNthCalledWith(2, 'canvas', {
      source: component,
      type: 'unselect-all'
    });
  });

  it('should publish link message on link', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component['link']();
    expect(spy).toHaveBeenCalledWith('canvas', {
      source: component,
      type: 'link',
      data: { svgEl: component.svgEl }
    });
  });

  it('should call clear if toolbar clear message received', () => {
    const spy = jest.spyOn(<any>component, 'clear');
    component['busService'].publish('toolbar', {
      source: this,
      type: 'clear'
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should call link if toolbar link message received', () => {
    const spy = jest.spyOn(<any>component, 'link');
    component['busService'].publish('toolbar', {
      source: this,
      type: 'link'
    });
    expect(spy).toHaveBeenCalled();
  });
});

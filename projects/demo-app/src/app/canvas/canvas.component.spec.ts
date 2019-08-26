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
      y: 3,
      subChannels: [],
      pubChannels: []
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
});

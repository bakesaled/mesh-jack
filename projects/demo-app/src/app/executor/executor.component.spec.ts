import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorComponent } from './executor.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { BusService } from '../../../../bus/src/lib';

describe('ExecutorComponent', () => {
  let component: ExecutorComponent;
  let fixture: ComponentFixture<ExecutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutorComponent],
      imports: [MatToolbarModule, MatIconModule],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should publish clear message and set dirty to false', () => {
    component.dirty = true;
    const spy = spyOn(component['busService'], 'publish');
    component.onClearClick();
    expect(spy).toHaveBeenCalled();
    expect(component.dirty).toBeFalsy();
  });

  it('should publish stop message and set flags', () => {
    component.running = true;
    const spyPub = spyOn(component['busService'], 'publish');
    const spyStop = spyOn(<any>component, 'stopCycle');
    component.onStopClick();
    expect(spyPub).toHaveBeenCalled();
    expect(spyStop).toHaveBeenCalled();
    expect(component.dirty).toBeTruthy();
    expect(component.running).toBeFalsy();
  });

  it('should publish start message and set flags', () => {
    const spyPub = spyOn(component['busService'], 'publish');
    const spyStart = spyOn(<any>component, 'runCycle');
    component.onRunClick();
    expect(spyPub).toHaveBeenCalled();
    expect(spyStart).toHaveBeenCalled();
    expect(component.dirty).toBeTruthy();
    expect(component.running).toBeTruthy();
  });
});

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
});

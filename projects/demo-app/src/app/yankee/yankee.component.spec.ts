import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YankeeComponent } from './yankee.component';
import { BusService } from '../../../../bus/src/lib/bus.service';

describe('YankeeComponent', () => {
  let component: YankeeComponent;
  let fixture: ComponentFixture<YankeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YankeeComponent],
      imports: [],
      providers: [BusService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YankeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

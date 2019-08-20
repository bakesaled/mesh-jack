import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaComponent } from './alpha.component';
import { BusService } from '../../../../bus/src/lib/bus.service';
import { FormsModule } from '@angular/forms';

describe('AlphaComponent', () => {
  let component: AlphaComponent;
  let fixture: ComponentFixture<AlphaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphaComponent],
      imports: [FormsModule],
      providers: [BusService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

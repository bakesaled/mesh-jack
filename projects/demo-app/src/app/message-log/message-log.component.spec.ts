import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageLogComponent } from './message-log.component';
import { MatListModule } from '@angular/material';
import { BusService } from '../../../../bus/src/lib';

describe('MessageLogComponent', () => {
  let component: MessageLogComponent;
  let fixture: ComponentFixture<MessageLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageLogComponent],
      imports: [MatListModule],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add leading zero', () => {
    const result = component['addLeadingZero'](5);
    expect(result).toBe('05');
  });

  it('should format time', () => {
    const time = new Date('1/1/2019 5:30:20.456');
    const result = component['formatTime'](time);
    expect(result).toBe('05:30:20.456');
  });

  it('should format message', () => {
    const result = component['formatMessage']('cookies');
    expect(result).toContain(' - cookies');
  });
});

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

  it('should add new message on component-channel message', () => {
    component['busService'].publish('component-channel', {
      source: this,
      type: 'hulk'
    });
    expect(component.messages.length).toBe(1);
  });

  it('should add new message on executor start message', () => {
    component['busService'].publish('executor', {
      source: this,
      type: 'start'
    });
    expect(component.messages.length).toBe(1);
  });

  it('should add new message on executor stop message', () => {
    component['busService'].publish('executor', {
      source: this,
      type: 'stop'
    });
    expect(component.messages.length).toBe(1);
  });

  it('should clear messages on executor clear message', () => {
    component.messages.push('hulk');
    component['busService'].publish('executor', {
      source: this,
      type: 'clear'
    });
    expect(component.messages.length).toBe(0);
  });
});

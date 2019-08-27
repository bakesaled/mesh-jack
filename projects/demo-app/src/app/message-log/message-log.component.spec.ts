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
});

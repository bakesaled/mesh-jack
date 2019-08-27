import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuluComponent } from './zulu.component';
import { BusService } from '../../../../bus/src/lib';
import { Subscription } from 'rxjs';

describe('ZuluComponent', () => {
  let component: ZuluComponent;
  let fixture: ComponentFixture<ZuluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZuluComponent],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZuluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to executor messages', () => {
    component.model = <any>{
      id: 'hulk'
    };
    component['busService'].publish('linkable', {
      source: this,
      data: {
        event: 'linkComplete',
        startComponent: {
          id: 'hulk'
        }
      }
    });
    expect(component['pulseSubscription']).not.toBe(Subscription.EMPTY);
  });
});

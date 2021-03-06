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

  it('should init subscriptions on linkComplete message from linkable', () => {
    const spy = jest.spyOn(<any>component, 'initSubscriptions');
    component.model = <any>{
      id: 'hulk'
    };
    component['busService'].publish('linkable', {
      source: this,
      type: 'link-complete',
      data: {
        startComponent: {
          id: 'the'
        },
        endComponent: {
          id: 'hulk'
        }
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should subscribe to executor messages if id matches startComponent', () => {
    const spy = jest.spyOn(<any>component, 'subscribeToExecutorMessages');
    component.model = <any>{
      id: 'the'
    };
    component['initSubscriptions']({
      source: this,
      type: 'link-component',
      data: {
        startComponent: {
          id: 'the'
        },
        endComponent: {
          id: 'hulk'
        }
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should publish `sent` component message if `pulse` message received from executor', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component.model = <any>{
      id: 'hulk'
    };
    component['subscribeToExecutorMessages']();
    component['busService'].publish('executor', {
      source: this,
      type: 'pulse'
    });
    expect(component['pulseSubscription']).not.toBe(Subscription.EMPTY);
    expect(spy).toHaveBeenNthCalledWith(2, 'component-channel', {
      source: component,
      type: 'sent',
      data: `hulk --> sent`
    });
  });

  it('should publish `received` component message if `sent` component message received from other component', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component.model = <any>{
      id: 'hulk'
    };
    component['subscribeToComponentMessages']({
      data: {
        startComponent: {
          id: 'the'
        }
      }
    });
    component['busService'].publish('component-channel', {
      source: { model: { id: 'the' } },
      type: 'sent'
    });
    expect(spy).toHaveBeenCalledWith('component-channel', {
      source: component,
      type: 'received',
      data: `the --> received --> hulk`
    });
  });
});

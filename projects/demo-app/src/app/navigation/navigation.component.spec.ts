import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { ElementsComponent } from '../elements/elements.component';
import { FactoryComponent } from '../factory/factory.component';
import { BusService } from '../../../../bus/src/lib';
import { ExecutorComponent } from '../executor/executor.component';
import { MessageLogComponent } from '../message-log/message-log.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        CanvasComponent,
        ElementsComponent,
        FactoryComponent,
        ExecutorComponent,
        MessageLogComponent
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
      ],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should increment selectedComponentCount', () => {
    component['busService'].publish('selectable', {
      source: this,
      type: 'selected'
    });
    expect(component['selectedCount']).toBe(1);
  });

  it('should decrement selectedComponentCount', () => {
    component['selectedCount'] = 1;
    component['busService'].publish('selectable', {
      source: this,
      type: 'unselected'
    });
    expect(component['selectedCount']).toBe(0);
  });

  it('should set dirty if drop message comes from droppable', () => {
    expect(component.dirty).toBe(false);
    component['busService'].publish('droppable', {
      source: this,
      type: 'drop',
      data: { component: {} }
    });
    expect(component.dirty).toBe(true);
  });

  it('should set selectedCount = 0 if clear or unselectAll message comes from canvas', () => {
    component['selectedCount'] = 1;
    expect(component.dirty).toBe(false);
    component['busService'].publish('canvas', {
      source: this,
      type: 'clear'
    });
    expect(component['selectedCount']).toBe(0);

    component['selectedCount'] = 1;
    expect(component.dirty).toBe(false);
    component['busService'].publish('canvas', {
      source: this,
      type: 'unselect-all'
    });
    expect(component['selectedCount']).toBe(0);
  });

  it('should publish toolbar link event', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component.onLinkClick();
    expect(spy).toHaveBeenCalledWith('toolbar', {
      source: component,
      type: 'link'
    });
  });

  it('should publish toolbar clear event and reset dirty', () => {
    const spy = jest.spyOn(component['busService'], 'publish');
    component.dirty = true;
    component.onClearClick();
    expect(spy).toHaveBeenCalledWith('toolbar', {
      source: component,
      type: 'clear'
    });
    expect(component.dirty).toBe(false);
  });
});

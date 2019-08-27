import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryComponent } from './factory.component';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ZuluComponent } from '../zulu/zulu.component';
import { ComponentFactoryService } from '../component-factory.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BusService } from '../../../../bus/src/lib';

@Component({
  template: `
    <app-factory [model]="model"></app-factory>
  `
})
class MockFactoryContainerComponent {
  model: any = {
    id: 'testId'
  };
  @ViewChild(FactoryComponent, { static: true })
  factoryComponent: FactoryComponent;
}

class MockComponentFactoryService {
  createComponent<T>(
    typeKey: string,
    viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ): ZuluComponent {
    const factory = factoryResolver.resolveComponentFactory(ZuluComponent);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    return componentRef.instance;
  }
}

describe('FactoryComponent', () => {
  let component: MockFactoryContainerComponent;
  let fixture: ComponentFixture<MockFactoryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FactoryComponent,
        MockFactoryContainerComponent,
        ZuluComponent
      ],
      providers: [
        {
          provide: ComponentFactoryService,
          useClass: MockComponentFactoryService
        },
        BusService
      ]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ZuluComponent]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFactoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and remove component from ViewContainerRef', () => {
    expect(component.factoryComponent['viewContainerRef'].length).toBe(1);
    component.factoryComponent.destroyComponent();
    expect(component.factoryComponent['viewContainerRef'].length).toBe(0);
  });
});

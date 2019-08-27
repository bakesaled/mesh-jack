import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFactoryService } from './component-factory.service';
import {
  Component,
  ComponentFactoryResolver,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ZuluComponent } from './zulu/zulu.component';
import { BusService } from '../../../bus/src/lib';

@Component({
  template: ''
})
class TestParentComponent {
  constructor(
    public viewContainerRef: ViewContainerRef,
    @Inject(ComponentFactoryResolver)
    public factoryResolver: ComponentFactoryResolver
  ) {}
}

@Component({
  template: ''
})
class TestChildComponent {
  constructor() {}
}

describe('ComponentFactoryService', () => {
  let service: ComponentFactoryService;
  let component: TestParentComponent;
  let fixture: ComponentFixture<TestParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestParentComponent, TestChildComponent, ZuluComponent],
      providers: [ComponentFactoryService, BusService]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TestChildComponent, ZuluComponent]
      }
    });
    service = TestBed.get(ComponentFactoryService);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail to create a component that does not exist in registry', () => {
    expect(function() {
      service.createComponent<TestChildComponent>(
        'TestChildComponent',
        component.viewContainerRef,
        component.factoryResolver
      );
    }).toThrowError(`type TestChildComponent is undefined`);
  });

  it('should create a component', () => {
    const child = service.createComponent<ZuluComponent>(
      'ZuluComponent',
      component.viewContainerRef,
      component.factoryResolver
    );
    expect(child).toBeDefined();
    expect(fixture.componentInstance.viewContainerRef.length).toBe(1);
    expect(child instanceof ZuluComponent).toBeTruthy();
  });
});

import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnChanges,
  ViewContainerRef
} from '@angular/core';
import { ComponentFactoryService } from '../component-factory.service';
import { ComponentModel } from '../component.model';
import { ZuluComponent } from '../zulu/zulu.component';

@Component({
  selector: 'app-factory',
  template: ''
})
export class FactoryComponent implements OnChanges {
  @Input() public model: ComponentModel;

  constructor(
    private factoryService: ComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    @Inject(ComponentFactoryResolver)
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges() {
    this.createComponent();
  }

  createComponent() {
    if (!this.model) {
      return;
    }
    const component = this.factoryService.createComponent<ZuluComponent>(
      'ZuluComponent',
      this.viewContainerRef,
      this.factoryResolver
    );
    component.model = this.model;
  }

  destroyComponent() {
    this.viewContainerRef.clear();
  }
}

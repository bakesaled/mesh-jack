import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { ZuluComponent } from './zulu/zulu.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {
  private builtinTypes = {
    ZuluComponent: ZuluComponent
  };

  constructor() {}

  createComponent<T>(
    typeKey: string,
    viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ): T {
    let type: Type<T>;
    if (typeof typeKey === 'string') {
      type = this.builtinTypes[typeKey];

      if (!type) {
        throw new Error(`type ${typeKey} is undefined`);
      }
    }

    const factory = factoryResolver.resolveComponentFactory(type);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    return componentRef.instance;
  }
}

import { DraggableDirective } from './draggable.directive';
import { ElementRef } from '@angular/core';

describe('DraggableDirective', () => {
  const nativeEl = {
    setAttribute(name, value) {}
  };
  const el = new ElementRef(nativeEl);
  it('should create an instance', () => {
    const directive = new DraggableDirective(el);
    expect(directive).toBeTruthy();
  });
});

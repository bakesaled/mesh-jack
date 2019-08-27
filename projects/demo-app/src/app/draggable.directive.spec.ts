import { DraggableDirective } from './draggable.directive';
import { ElementRef } from '@angular/core';

describe('DraggableDirective', () => {
  let directive: DraggableDirective;
  const nativeEl = {
    setAttribute() {}
  };
  const el = new ElementRef(nativeEl);
  beforeEach(() => {
    directive = new DraggableDirective(el);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set element to be dragged', () => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', 'hulk');
    const event: any = {
      target: {
        getElementsByTagName: () => [g]
      },
      dataTransfer: {
        setData: () => undefined
      }
    };
    const spy = jest.spyOn(event.dataTransfer, 'setData');
    directive.onDragStart(event);
    expect(spy).toHaveBeenCalledWith('text', 'hulk');
  });

  it('should prevent default behavior on dragover', () => {
    const event = {
      preventDefault: () => undefined
    };
    const spy = jest.spyOn(event, 'preventDefault');
    directive.onDragOver(event);
    expect(spy).toHaveBeenCalled();
  });
});

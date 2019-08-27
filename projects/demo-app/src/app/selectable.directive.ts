import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BusService } from '../../../bus/src/lib';
import { ComponentModel } from './component.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private dragStartCoords: any;
  private selectedComponents: ComponentModel[] = [];

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.busService
      .channel('canvas')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        switch (message.data.event) {
          case 'unselectAll':
            this.unSelectAll();
            break;
          case 'clear':
            this.unSelectAll();
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    let el = event.target as SVGElement;
    if (!el) {
      return;
    }

    if (this.elementWasDragged(event)) {
      this.busService.publish('selectable', {
        source: this,
        data: {
          selected: true,
          component: {
            id: this.getNearestElementId(el),
            x: event.offsetX,
            y: event.offsetY
          }
        }
      });
      return;
    }

    if (el.localName === 'text') {
      el = el.previousSibling as SVGElement;
    }
    if (el.localName === 'circle') {
      this.setSelected(el, !this.elementSelected(el), {
        x: event.offsetX,
        y: event.offsetY
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.dragStartCoords = { x: event.x, y: event.y };
    }
  }

  private elementWasDragged(event: MouseEvent): boolean {
    const result =
      this.dragStartCoords &&
      (this.dragStartCoords.x !== event.x ||
        this.dragStartCoords.y !== event.y);
    this.dragStartCoords = undefined;
    return result;
  }

  private elementSelected(el: SVGElement) {
    return el.getAttribute('stroke') === 'blue';
  }

  private getNearestElementId(el: SVGElement) {
    return el.id === '' ? el.parentElement.id : el.id;
  }

  private setSelected(el: SVGElement, selected: boolean, coords?: { x; y }) {
    const foundIdx = this.selectedComponents.findIndex(comp => {
      return comp.id === this.getNearestElementId(el);
    });
    let component = {
      id: this.getNearestElementId(el),
      x: undefined,
      y: undefined
    };
    if (selected) {
      el.setAttribute('stroke', 'blue');
      el.setAttribute('stroke-width', '5px');
      if (coords) {
        component.x = coords.x;
        component.y = coords.y;
      }
      if (foundIdx < 0 && this.selectedComponents.length < 2) {
        this.selectedComponents.push(<any>component);
      }
    } else {
      el.setAttribute('stroke', 'black');
      el.setAttribute('stroke-width', '1px');
      if (foundIdx > -1) {
        this.selectedComponents.splice(foundIdx, 1);
      }
    }

    this.busService.publish('selectable', {
      source: this,
      data: { event: 'selected', selected: selected, component: component }
    });
  }

  private unSelectAll() {
    const circles = document.getElementsByTagName('circle');
    for (let i = 0; i < circles.length; i++) {
      const el = circles[i];
      this.setSelected(el, false);
    }
  }
}

import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ComponentModel } from './component.model';
import { BusService } from '../../../bus/src/lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appLinkable]'
})
export class LinkableDirective implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  private lines: string[] = [];
  private selectedComponents: ComponentModel[] = [];

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.busService
      .channel('canvas')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        switch (message.data.event) {
          case 'link':
            this.link(message.data.svgEl);
            break;
          case 'clear':
            this.clear(message.data.svgEl);
            break;
        }
      });

    this.busService
      .channel('droppable')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        if (message.data.event === 'mousemove') {
          const foundLineIds = this.lines.filter(lineId => {
            return lineId.includes(message.data.component.id);
          });

          if (foundLineIds.length > 0) {
            foundLineIds.forEach(id => {
              this.positionLine(id, message.data.component);
            });
          }
        }
      });

    this.busService
      .channel('selectable')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        if (message.data.event === 'selected') {
          const foundIdx = this.selectedComponents.findIndex(comp => {
            return comp.id === message.data.component.id;
          });
          if (message.data.selected) {
            if (foundIdx < 0) {
              this.selectedComponents.push(message.data.component);
            }
          } else {
            if (foundIdx) {
              this.selectedComponents.splice(foundIdx, 1);
            }
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  private link(svgEl: SVGElement) {
    let line;
    if (this.selectedComponents.length < 2) {
      return;
    }

    line = document.getElementById(
      this.getLineIdFromSelectedComponents()
    ) as HTMLElement;
    if (line) {
      svgEl.removeChild(line);
      const lineIdx = this.lines.indexOf(line.id);
      if (lineIdx > -1) {
        this.lines.splice(lineIdx, 1);
      }
    } else {
      this.drawLine(svgEl);
    }
    this.busService.publish('linkable', {
      source: this,
      data: {
        event: 'linkComplete',
        startComponent: this.selectedComponents[0],
        endComponent: this.selectedComponents[1]
      }
    });
  }

  private drawLine(svgEl: SVGElement) {
    const lineId = this.getLineIdFromSelectedComponents();
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke-width', '5');
    line.setAttribute('stroke', 'black');
    line.setAttribute('marker-end', 'url(#head)');
    line.setAttribute('id', lineId);

    line.setAttribute('x1', this.selectedComponents[0].x.toString());
    line.setAttribute('x2', this.selectedComponents[1].x.toString());
    line.setAttribute('y1', this.selectedComponents[0].y.toString());
    line.setAttribute('y2', this.selectedComponents[1].y.toString());

    svgEl.append(line);
    this.lines.push(lineId);
  }

  private positionLine(lineId: string, component: ComponentModel) {
    const startId = lineId.split('-')[1];
    const endId = lineId.split('-')[2];
    const line = document.getElementById(lineId) as HTMLElement;

    if (component.id === startId) {
      line.setAttribute('x1', component.x.toString());
      line.setAttribute('y1', component.y.toString());
    } else if (component.id === endId) {
      line.setAttribute('x2', component.x.toString());
      line.setAttribute('y2', component.y.toString());
    }
  }

  private getLineIdFromSelectedComponents() {
    return `line-${this.selectedComponents[0].id}-${this.selectedComponents[1].id}`;
  }

  private clear(svgEl: SVGElement) {
    while (
      svgEl.lastChild &&
      (svgEl.lastChild as SVGElement).localName === 'line'
    ) {
      svgEl.removeChild(svgEl.lastChild);
    }
    this.lines = [];
    this.selectedComponents = [];
  }
}

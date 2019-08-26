import { Directive, HostListener } from '@angular/core';
import { SvgService } from './svg.service';
import { UuidUtil } from './uuid.util';
import { BusService } from '../../../bus/src/lib';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any;

  constructor(private svgService: SvgService, private busService: BusService) {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    const dropzone = event.target;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document
      .getElementById(droppedElementId)
      .cloneNode(true) as SVGElement;
    const uuid = UuidUtil.new();
    droppedElement.id = `${uuid}`;
    dropzone.appendChild(droppedElement);

    if (droppedElement.localName !== 'g') {
      console.warn('only g elements allowed to be dropped');
    }
    (droppedElement.firstChild as SVGElement).setAttribute('draggable', 'true');
    (droppedElement.childNodes[1] as SVGElement).setAttribute(
      'draggable',
      'true'
    );
    (droppedElement.childNodes[1] as SVGElement).innerHTML = uuid;

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    this.setPosition(droppedElement, { x: svgPoint.x, y: svgPoint.y });
    this.busService.publish('droppable', {
      source: this,
      data: {
        event: 'drop',
        component: {
          id: uuid,
          subChannels: [],
          pubChannels: [],
          x: svgPoint.x,
          y: svgPoint.y
        }
      }
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y });
      this.busService.publish('droppable', {
        source: this,
        data: {
          event: 'mousemove',
          component: {
            id:
              this.draggingElement.id === ''
                ? this.draggingElement.parentElement.id
                : this.draggingElement.id,
            x: svgPoint.x,
            y: svgPoint.y
          }
        }
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(): void {
    this.draggingElement = null;
  }

  private setPosition(element: SVGElement, coord: { x; y }) {
    let textEl;
    if (element.localName === 'g') {
      textEl = element.childNodes[1] as SVGElement;
      element = element.firstChild as SVGElement;
    } else if (element.localName === 'text') {
      textEl = element;
      element = element.previousSibling as SVGElement;
    } else {
      textEl = element.nextSibling;
    }

    element.setAttribute('cx', coord.x);
    element.setAttribute('cy', coord.y);

    textEl.setAttribute('x', coord.x.toString());
    textEl.setAttribute('y', coord.y.toString());
  }
}

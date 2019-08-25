import { Directive, HostListener } from '@angular/core';
import { SvgService } from './svg.service';
import { UuidUtil } from './uuid.util';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any;

  constructor(private svgService: SvgService) {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    const dropzone = event.target;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document
      .getElementById(droppedElementId)
      .cloneNode(true) as HTMLElement;
    const uuid = UuidUtil.new();
    droppedElement.id = `${droppedElement.id}-${uuid}`;
    dropzone.appendChild(droppedElement);

    if (droppedElement.localName === 'g') {
      (droppedElement.firstChild as HTMLElement).setAttribute(
        'draggable',
        'true'
      );
      (droppedElement.childNodes[1] as HTMLElement).setAttribute(
        'draggable',
        'true'
      );
      (droppedElement.childNodes[1] as HTMLElement).innerHTML = uuid;
    } else {
      droppedElement.setAttribute('draggable', 'true');
    }

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    this.setPosition(droppedElement, { x: svgPoint.x, y: svgPoint.y });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    this.draggingElement = null;
  }

  private setPosition(element: HTMLElement, coord: { x; y }) {
    let secEl;
    if (element.localName === 'g') {
      secEl = element.childNodes[1] as HTMLElement;
      element = element.firstChild as HTMLElement;
    } else if (element.localName === 'text') {
      secEl = element;
      element = element.previousSibling as HTMLElement;
    } else {
      secEl = element.nextSibling;
    }

    element.setAttribute('cx', coord.x);
    element.setAttribute('cy', coord.y);

    secEl.setAttribute('x', coord.x.toString());
    secEl.setAttribute('y', coord.y.toString());
  }
}

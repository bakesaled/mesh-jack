import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  constructor() {}

  getSVGPoint(event, element): SVGPoint {
    // get the mouse coordinates and set them to the SVG point
    const point = element.viewportElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const CTM = element.viewportElement.getScreenCTM();
    return point.matrixTransform(CTM.inverse());
  }
}

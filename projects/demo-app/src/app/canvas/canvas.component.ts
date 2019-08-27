import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentModel } from '../component.model';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  public components: ComponentModel[] = [];

  @ViewChild('svg', { static: true }) svg: ElementRef;

  get svgEl(): SVGElement {
    return this.svg.nativeElement as SVGElement;
  }

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.busService.channel('toolbar').subscribe(message => {
      switch (message.data) {
        case 'clear':
          this.clear();
          break;
        case 'link':
          this.link();
          break;
      }
    });

    this.busService.channel('droppable').subscribe(message => {
      if (message.data.event === 'drop') {
        this.components.push(message.data.component);
      }
    });

    this.busService.channel('linkable').subscribe(message => {
      if (message.data.event === 'linkComplete') {
        this.busService.publish('canvas', {
          source: this,
          data: { event: 'unselectAll' }
        });
      }
    });
  }

  private clear() {
    while (
      this.svgEl.lastChild &&
      (this.svgEl.lastChild as SVGElement).localName !== 'defs'
    ) {
      this.svgEl.removeChild(this.svgEl.lastChild);
    }
    this.components = [];
    this.busService.publish('canvas', {
      source: this,
      data: {
        event: 'clear',
        svgEl: this.svgEl
      }
    });
  }

  private link() {
    this.busService.publish('canvas', {
      source: this,
      data: {
        event: 'link',
        svgEl: this.svgEl
      }
    });
  }
}

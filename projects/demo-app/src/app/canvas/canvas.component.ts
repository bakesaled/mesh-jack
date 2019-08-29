import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ComponentModel } from '../component.model';
import { BusService } from '../../../../bus/src/lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  public components: ComponentModel[] = [];

  @ViewChild('svg', { static: true }) svg: ElementRef;

  get svgEl(): SVGElement {
    return this.svg.nativeElement as SVGElement;
  }

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.busService
      .channel('toolbar')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        switch (message.type) {
          case 'clear':
            this.clear();
            break;
          case 'link':
            this.link();
            break;
        }
      });

    this.busService
      .channel('droppable')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        if (message.type === 'drop') {
          this.components.push(message.data.component);
        }
      });

    this.busService
      .channel('linkable')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        if (message.type === 'link-complete') {
          this.busService.publish('canvas', {
            source: this,
            type: 'unselect-all'
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
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
      type: 'clear',
      data: {
        svgEl: this.svgEl
      }
    });
  }

  private link() {
    this.busService.publish('canvas', {
      source: this,
      type: 'link',
      data: {
        svgEl: this.svgEl
      }
    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentDropService } from '../component-drop.service';
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

  constructor(
    private componentDropService: ComponentDropService,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    this.componentDropService.drop$.subscribe(id => {
      this.components.push({ id: id, pubChannels: [], subChannels: [] });
    });

    this.busService.channel('toolbar').subscribe(message => {
      if (message.data === 'clear') {
        this.clear();
      }
    });
  }

  private clear() {
    const svgEl = this.svg.nativeElement as HTMLElement;
    svgEl.innerHTML = '';
    this.components = [];
  }
}

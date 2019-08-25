import { Component, OnInit } from '@angular/core';
import { ComponentDropService } from '../component-drop.service';
import { ComponentModel } from '../component.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  public components: ComponentModel[] = [];

  constructor(private componentDropService: ComponentDropService) {}

  ngOnInit(): void {
    this.componentDropService.drop$.subscribe(id => {
      this.components.push({ id: id, pubChannels: [], subChannels: [] });
    });
  }
}

import { Component } from '@angular/core';
import { BusService } from '../../../bus/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private busService: BusService) {
    const debug = localStorage.getItem('mesh-jack-debug');
    busService.debug = debug ? JSON.parse(debug) : false;
  }
}

import { Component, OnInit } from '@angular/core';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.scss'],
})
export class AlphaComponent implements OnInit {
  message: string;
  constructor(private busService: BusService) {}

  ngOnInit() {}

  onSendClick() {
    this.busService.publish('alpha', { source: this, data: this.message });
  }
}

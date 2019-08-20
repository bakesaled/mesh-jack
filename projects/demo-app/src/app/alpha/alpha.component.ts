import { Component, OnInit } from '@angular/core';
import { BusService } from '../../../../bus/src/lib/bus.service';

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
    this.busService.publish('alpha', this.message);
  }
}

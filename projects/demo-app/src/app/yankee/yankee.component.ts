import { Component, OnInit } from '@angular/core';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-yankee',
  templateUrl: './yankee.component.html',
  styleUrls: ['./yankee.component.scss'],
})
export class YankeeComponent implements OnInit {
  message: string;
  constructor(private bus: BusService) {}

  ngOnInit() {
    this.bus.channel('alpha').subscribe(data => {
      this.message = data.data;
    });
  }
}

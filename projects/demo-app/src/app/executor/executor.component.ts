import { Component, OnInit } from '@angular/core';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-executor',
  templateUrl: './executor.component.html',
  styleUrls: ['./executor.component.scss']
})
export class ExecutorComponent implements OnInit {
  private interval = 1000;
  private timer;
  constructor(private busService: BusService) {}

  ngOnInit() {}

  onRunClick() {
    this.busService.publish('executor', {
      source: this,
      data: { event: 'start' }
    });
    this.runCycle();
  }

  onStopClick() {
    this.busService.publish('executor', {
      source: this,
      data: { event: 'stop' }
    });
    this.stopCycle();
  }

  onClearClick() {
    this.busService.publish('executor', {
      source: this,
      data: { event: 'clear' }
    });
  }

  private runCycle() {
    this.timer = setInterval(() => {
      this.busService.publish('executor', {
        source: this,
        data: { event: 'pulse' }
      });
    }, this.interval);
  }

  private stopCycle() {
    clearInterval(this.timer);
  }
}

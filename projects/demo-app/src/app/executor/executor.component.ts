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

  dirty = false;
  running = false;

  constructor(private busService: BusService) {}

  ngOnInit() {}

  onRunClick() {
    this.busService.publish('executor', {
      source: this,
      type: 'start'
    });
    this.runCycle();
    this.dirty = true;
    this.running = true;
  }

  onStopClick() {
    this.busService.publish('executor', {
      source: this,
      type: 'stop'
    });
    this.stopCycle();
    this.dirty = true;
    this.running = false;
  }

  onClearClick() {
    this.busService.publish('executor', {
      source: this,
      type: 'clear'
    });
    this.dirty = false;
  }

  private runCycle() {
    this.timer = setInterval(() => {
      this.busService.publish('executor', {
        source: this,
        type: 'pulse'
      });
    }, this.interval);
  }

  private stopCycle() {
    clearInterval(this.timer);
  }
}

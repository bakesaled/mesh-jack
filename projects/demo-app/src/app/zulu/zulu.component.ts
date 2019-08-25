import { Component, OnInit } from '@angular/core';
import { ComponentModel } from '../component.model';
import { BusService } from '../../../../bus/src/lib';
import { MessageLogService } from '../message-log.service';

@Component({
  selector: 'app-zulu',
  templateUrl: './zulu.component.html',
  styleUrls: ['./zulu.component.scss']
})
export class ZuluComponent implements OnInit {
  public model: ComponentModel;
  constructor(
    private busService: BusService,
    private messageLog: MessageLogService
  ) {}

  ngOnInit() {}

  public publishAll() {
    this.pubAll();
  }

  private addSubs() {
    this.model.subChannels.forEach(channel => {
      this.busService.channel(channel).subscribe(message => {
        this.messageLog.addMessage(message);
      });
    });
  }

  private pubAll() {
    this.model.pubChannels.forEach(channel => {
      this.busService.publish(channel, { source: this, data: `published` });
    });
  }
}

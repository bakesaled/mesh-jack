import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {
  messages: string[] = [];
  @ViewChild('list', { static: true }) private myScrollContainer: ElementRef;

  constructor(private busService: BusService) {}

  ngOnInit() {
    this.busService.channel('executor').subscribe(message => {
      switch (message.data.event) {
        case 'start':
          this.messages.push(this.formatMessage('starting'));
          break;
        case 'stop':
          this.messages.push(this.formatMessage('stopping'));
          break;
        case 'clear':
          this.messages = [];
          break;
      }
    });

    this.busService.channel('component-channel').subscribe(message => {
      this.messages.push(this.formatMessage(message.data.text));
    });
  }

  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  private formatMessage(text: string) {
    const timestamp = new Date();
    return `${this.formatTime(timestamp)} - ${text}`;
  }

  private formatTime(time: Date) {
    return `${this.addLeadingZero(time.getHours())}:${this.addLeadingZero(
      time.getMinutes()
    )}:${this.addLeadingZero(time.getSeconds())}.${this.addLeadingZero(
      time.getMilliseconds(),
      3
    )}`;
  }

  private addLeadingZero(
    number: string | number,
    targetLength: number = 2
  ): string {
    if (typeof number === 'number') {
      number = number.toString();
    }
    while (number.length < targetLength) {
      number = `0${number}`;
    }
    return number;
  }
}

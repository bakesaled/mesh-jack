import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BusService } from '../../../../bus/src/lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();

  messages: string[] = [];
  @ViewChild('list', { static: true }) private myScrollContainer: ElementRef;

  constructor(private busService: BusService) {}

  ngOnInit() {
    this.busService
      .channel('executor')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        switch (message.type) {
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

    this.busService
      .channel('component-channel')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        this.messages.push(this.formatMessage(message.data));
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
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

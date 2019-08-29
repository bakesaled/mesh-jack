import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentModel } from '../component.model';
import { BusService } from '../../../../bus/src/lib';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-zulu',
  templateUrl: './zulu.component.html',
  styleUrls: ['./zulu.component.scss']
})
export class ZuluComponent implements OnInit, OnDestroy {
  private pulseSubscription: Subscription = Subscription.EMPTY;
  private destroySubject = new Subject();

  public model: ComponentModel;
  get channelName() {
    return 'component-channel';
  }
  constructor(private busService: BusService) {}

  ngOnInit() {
    this.busService
      .channel('linkable')
      .pipe(takeUntil(this.destroySubject))
      .subscribe(message => {
        if (message.type === 'link-complete') {
          this.initSubscriptions(message);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  private initSubscriptions(linkableMessage) {
    if (linkableMessage.data.startComponent.id === this.model.id) {
      this.subscribeToExecutorMessages();
    }
    if (linkableMessage.data.endComponent.id === this.model.id) {
      this.subscribeToComponentMessages(linkableMessage);
    }
  }

  private subscribeToExecutorMessages() {
    if (this.pulseSubscription === Subscription.EMPTY) {
      this.pulseSubscription = this.busService
        .channel('executor')
        .subscribe(executorMessage => {
          if (executorMessage.type === 'pulse') {
            this.busService.publish(this.channelName, {
              source: this,
              type: 'sent',
              data: `${this.model.id} --> sent`
            });
          }
        });
    }
  }

  private subscribeToComponentMessages(linkableMessage) {
    this.busService.channel(this.channelName).subscribe(componentMessage => {
      if (
        componentMessage.source.model.id ===
          linkableMessage.data.startComponent.id &&
        componentMessage.type === 'sent'
      ) {
        this.busService.publish(this.channelName, {
          source: this,
          type: 'received',
          data: `${componentMessage.source.model.id} --> received --> ${this.model.id}`
        });
      }
    });
  }
}

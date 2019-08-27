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
      .subscribe(linkableMessage => {
        if (linkableMessage.data.event === 'linkComplete') {
          if (linkableMessage.data.startComponent.id === this.model.id) {
            if (this.pulseSubscription === Subscription.EMPTY) {
              this.pulseSubscription = this.busService
                .channel('executor')
                .subscribe(executorMessage => {
                  if (executorMessage.data.event === 'pulse') {
                    this.busService.publish(this.channelName, {
                      source: this,
                      data: { event: 'sent', text: `${this.model.id} --> sent` }
                    });
                  }
                });
            }
          }
          if (linkableMessage.data.endComponent.id === this.model.id) {
            this.busService
              .channel(this.channelName)
              .subscribe(componentMessage => {
                if (
                  componentMessage.source.model.id ===
                  linkableMessage.data.startComponent.id
                ) {
                  this.busService.publish(this.channelName, {
                    source: this,
                    data: {
                      event: 'received',
                      text: `${componentMessage.source.model.id} --> received --> ${this.model.id}`
                    }
                  });
                }
              });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}

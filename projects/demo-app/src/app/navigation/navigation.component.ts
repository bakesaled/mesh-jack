import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private busService: BusService
  ) {}

  onClearClick() {
    this.busService.publish('toolbar', { source: this, data: 'clear' });
  }

  onLinkClick() {
    this.busService.publish('toolbar', { source: this, data: 'link' });
  }
}

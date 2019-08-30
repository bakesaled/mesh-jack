import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { BusService } from '../../../../bus/src/lib';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private debugSubject = new BehaviorSubject<boolean>(false);

  selectedCount = 0;
  dirty = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
  debug$ = this.debugSubject.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    this.busService.channel('selectable').subscribe(message => {
      if (message.type === 'selected') {
        if (this.selectedCount < 2) {
          this.selectedCount++;
        }
      } else {
        if (this.selectedCount > 0) {
          this.selectedCount--;
        }
      }
    });

    this.busService.channel('droppable').subscribe(message => {
      if (message.type === 'drop') {
        this.dirty = true;
      }
    });

    this.busService.channel('canvas').subscribe(message => {
      switch (message.type) {
        case 'unselect-all':
        case 'clear':
          this.selectedCount = 0;
          break;
      }
    });

    const debug = localStorage.getItem('mesh-jack-debug');
    this.debugSubject.next(debug ? JSON.parse(debug) : false);
  }

  onClearClick() {
    this.busService.publish('toolbar', { source: this, type: 'clear' });
    this.dirty = false;
  }

  onLinkClick() {
    this.busService.publish('toolbar', { source: this, type: 'link' });
  }

  onDebugChange(checked: boolean) {
    this.debugSubject.next(checked);
    localStorage.setItem('mesh-jack-debug', JSON.stringify(checked));
    this.busService.debug = true;
  }
}

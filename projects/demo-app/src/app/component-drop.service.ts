import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComponentModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentDropService {
  private dropSubject: Subject<ComponentModel> = new Subject<ComponentModel>();
  public drop$: Observable<ComponentModel> = this.dropSubject.asObservable();
  constructor() {}

  public emitDrop(model: ComponentModel) {
    this.dropSubject.next(model);
  }
}

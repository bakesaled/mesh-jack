import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentDropService {
  private dropSubject: Subject<string> = new Subject<string>();
  public drop$: Observable<string> = this.dropSubject.asObservable();
  constructor() {}

  public emitDrop(id: string) {
    this.dropSubject.next(id);
  }
}

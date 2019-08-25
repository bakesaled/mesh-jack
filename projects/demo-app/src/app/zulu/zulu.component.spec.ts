import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuluComponent } from './zulu.component';
import { BusService } from '../../../../bus/src/lib';

describe('ZuluComponent', () => {
  let component: ZuluComponent;
  let fixture: ComponentFixture<ZuluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZuluComponent],
      providers: [BusService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZuluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

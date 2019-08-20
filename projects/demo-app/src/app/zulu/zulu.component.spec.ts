import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuluComponent } from './zulu.component';

describe('ZuluComponent', () => {
  let component: ZuluComponent;
  let fixture: ComponentFixture<ZuluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZuluComponent ]
    })
    .compileComponents();
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

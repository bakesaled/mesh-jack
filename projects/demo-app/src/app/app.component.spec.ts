import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { mockLocalStorage } from './local-storage.mock';
import { BusService } from '../../../bus/src/lib';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    component['busService'].debug = false;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'demo-app'`, () => {
    expect(component['busService'].debug).toBeFalsy();
    localStorage.setItem('mesh-jack-debug', 'true');
    component = new AppComponent(TestBed.get(BusService));
    expect(component['busService'].debug).toBeTruthy();
  });
});

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { BravoComponent } from './bravo/bravo.component';
import { ZuluComponent } from './zulu/zulu.component';
import { YankeeComponent } from './yankee/yankee.component';
import { BusService } from '../../../bus/src/lib/bus.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    BravoComponent,
    ZuluComponent,
    YankeeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BusService],
  bootstrap: [AppComponent],
})
export class AppModule {}

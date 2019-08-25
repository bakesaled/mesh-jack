import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { BravoComponent } from './bravo/bravo.component';
import { ZuluComponent } from './zulu/zulu.component';
import { YankeeComponent } from './yankee/yankee.component';
import { BusService } from '../../../bus/src/lib';
import { FormsModule } from '@angular/forms';
import { MessageLogComponent } from './message-log/message-log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CanvasComponent } from './canvas/canvas.component';
import { ElementsComponent } from './elements/elements.component';
import { DroppableDirective } from './droppable.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    BravoComponent,
    ZuluComponent,
    YankeeComponent,
    MessageLogComponent,
    NavigationComponent,
    CanvasComponent,
    ElementsComponent,
    DroppableDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [BusService],
  bootstrap: [AppComponent]
})
export class AppModule {}

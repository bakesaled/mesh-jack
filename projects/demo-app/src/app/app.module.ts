import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZuluComponent } from './zulu/zulu.component';
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
import { FactoryComponent } from './factory/factory.component';
import { SelectableDirective } from './selectable.directive';
import { LinkableDirective } from './linkable.directive';
import { ExecutorComponent } from './executor/executor.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ZuluComponent,
    MessageLogComponent,
    NavigationComponent,
    CanvasComponent,
    ElementsComponent,
    DroppableDirective,
    DraggableDirective,
    FactoryComponent,
    SelectableDirective,
    LinkableDirective,
    ExecutorComponent
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
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [BusService],
  bootstrap: [AppComponent],
  entryComponents: [ZuluComponent]
})
export class AppModule {}

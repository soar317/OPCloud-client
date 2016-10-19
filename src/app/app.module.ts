import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { JointInitializerService } from './shared/services/joint-initializer.service';
import { RappidLayoutService } from './shared/services/rappid-layout.service';
import { AppComponent } from './app.component';
import { RappidMainComponent } from './rappid-main/rappid-main.component';
import { RappidToolbarComponent } from './rappid-toolbar/rappid-toolbar.component';
import { RappidStencilComponent } from './rappid-stencil/rappid-stencil.component';
import { RappidPaperComponent } from './rappid-paper/rappid-paper.component';
import { RappidInspectorComponent } from './rappid-inspector/rappid-inspector.component';
import { RappidStatusbarComponent } from './rappid-statusbar/rappid-statusbar.component';
import { OpmShapesService } from './shared/services/opm-shapes.service';

@NgModule({
  declarations: [
    AppComponent,
    RappidMainComponent,
    RappidToolbarComponent,
    RappidStencilComponent,
    RappidPaperComponent,
    RappidInspectorComponent,
    RappidStatusbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [JointInitializerService, RappidLayoutService, OpmShapesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

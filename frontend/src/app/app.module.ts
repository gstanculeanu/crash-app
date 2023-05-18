import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './my-component/button.component';
import { CrashGraphComponent } from './crash-graph-component/crash-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CrashGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

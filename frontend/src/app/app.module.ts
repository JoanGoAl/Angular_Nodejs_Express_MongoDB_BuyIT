import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';

// Http
import { HttpClientModule } from '@angular/common/http'

// Components
import { AppComponent } from './app.component';

// PrimeNG
import { AccordionModule } from 'primeng/accordion'
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';

import { FooterComponent, HeaderComponent, SharedModule } from './shared';

import { FormsModule } from '@angular/forms'
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AccordionModule,
    MegaMenuModule,
    CardModule,
    FormsModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { MapComponent } from './map/map.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    MapComponent,
    PlaceholderDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy9H1KpCjpydubNEkljePEAc1oU1bUEVE',
      libraries: ['places']
    }),
   NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[MapComponent]
})
export class AppModule { }

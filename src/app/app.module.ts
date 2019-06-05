import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { CounterDirective } from './directives/counter.directive';

@NgModule({
  declarations: [
    AppComponent,
    CounterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

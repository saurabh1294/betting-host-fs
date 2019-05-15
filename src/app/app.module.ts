import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ToteBetCalculatorComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToteBetsDataService } from './shared/services/totebet-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ToteBetCalculatorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [{ provide: ToteBetsDataService, useClass: ToteBetsDataService }],
  bootstrap: [ToteBetCalculatorComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TransactionModule } from './transaction/transaction.module';
import { InvestmentModule } from './investment/investment.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    PortfolioModule,
    TransactionModule,
    InvestmentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

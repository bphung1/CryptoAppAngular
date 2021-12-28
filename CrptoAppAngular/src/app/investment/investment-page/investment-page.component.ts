import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/model/portfolio';
import { Investment } from 'src/app/model/investment';
import { Agent } from 'src/app/api/agent';
import { Router } from '@angular/router';


@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css']
})
export class InvestmentPageComponent implements OnInit {

portfolio : Portfolio;
investments : Investment[];
isLoaded = false;

  constructor(private router: Router, private service: Agent) {}
  filteredInvestments = new Map<string, number[]>();
   
  ngOnInit(): void {
    this.stayLoggedInForTestingPurpose();
  }
  
  //DELETE AFTER FINISH BUILDING APP AND REPLACE WITH this.getInvestmentByPortfolio();
  stayLoggedInForTestingPurpose() {
    this.isLoaded = false;
    this.service.getUser('someone', 'password')
      .then(user => {
        this.service.getPortfolio(user.userid).then(portfolio => {
          this.portfolio = portfolio;
          this.getInvestmentByPortfolio();
        });
      })
  }

  getInvestmentByPortfolio() {
    this.isLoaded = false;
    this.service.portfolioFromAPI.then(portfolio =>{
        this.portfolio = portfolio;
    })
    .then(() => {
      this.service.getInvestment(this.portfolio.portfolioId).then(investments => {
        this.investments = investments;
        this.isLoaded = true;
        this.filterInvestments();
      })
    })
  }

  filterInvestments() {
    let usedCryptNames = new Set<string>(); 
    for (let currInvest of this.investments) {
        usedCryptNames.add(currInvest.cryptoName);
    }

    for(let name of usedCryptNames) {

        let investmentsForCrypto = this.investments.filter(investment => investment.cryptoName == name);

        let investAmtForCrypto = investmentsForCrypto.reduce((investAmtSum, currInv) => investAmtSum + currInv.investedAmount, 0);
        let sharesForCrypto = investmentsForCrypto.reduce((sharesSum, currInv) => sharesSum + currInv.shares, 0);

        this.filteredInvestments.set(name, [investAmtForCrypto, sharesForCrypto]);

    }
  }

  backToPortfolio() {
    this.router.navigate(['portfolio']);
  }
}







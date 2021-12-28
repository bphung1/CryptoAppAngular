import { Component, OnInit, ViewChild } from '@angular/core';
import { Agent } from 'src/app/api/agent';
import { Portfolio } from 'src/app/model/portfolio';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  user: User;
  portfolio: Portfolio;
  isLoading = false;
  hideIt = true;
  operation: string;
  amount: number;
  btnStyle = "divClosed";
  nonInvestedIsClicked = false;
  investedIsClicked = false;

  constructor(private router: Router,private service: Agent) { }

  ngOnInit(): void {
    this.stayLoggedInForTestingPurpose();
  }

  //DELETE AFTER FINISH BUILDING APP AND REPLACE WITH this.getUserAndPortfolio();
  stayLoggedInForTestingPurpose() {
    this.isLoading = false;
    this.service.getUser('someone', 'password')
      .then(user => {
        this.user = user;
        this.getUserAndPortfolio();
      })
  }

  getUserAndPortfolio() {
    this.isLoading = false;
    this.service.userFromAPI
    .then(user => {
      this.user = user;
    })
    .then(() => {
      this.service.getPortfolio(this.user.userid)
        .then(portfolio => {
          this.portfolio = portfolio;
          this.isLoading = true;
        })
    });
  }

  goToTransaction() {
    this.router.navigate(['transaction']);
  }

  goToInvestment() {
    this.router.navigate(['investment']);
  }

  onSubmit(){
    if (this.operation.localeCompare("deposit") == 0){
      this.service.deposit(this.amount,this.user.userid).then(portfolio => {
      this.portfolio = portfolio;
    })
    } else {
      this.service.withdraw(this.amount,this.user.userid).then(portfolio => {
        this.portfolio = portfolio;
      })
    }
    this.amount = 0;
    this.hideIt = true;
  }

  deposit() {
    this.hideIt = !this.hideIt;
    if (this.operation == "withdraw") {
      this.hideIt = false;
    }
    if (!this.hideIt) {
      this.operation = "deposit";
      this.btnStyle = "divCenter";
     } else {
      this.btnStyle = "divClosed";
    }
  }

  withdraw() {
    this.hideIt = !this.hideIt;
    if (this.operation == "deposit"){
      this.hideIt = false;
    }
    if (!this.hideIt) {
     this.operation = "withdraw";
     this.btnStyle = "divCenter";
    } else {
      this.btnStyle = "divClosed";
    }
  }

  nonInvestOnClick() {
    this.hideIt = true;
    this.nonInvestedIsClicked = !this.nonInvestedIsClicked;
  }

  investOnClick() {
    this.investedIsClicked = !this.investedIsClicked;
  }
}

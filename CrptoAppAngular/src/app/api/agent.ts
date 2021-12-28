import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Portfolio } from "../model/portfolio";
import { Transaction } from "../model/transaction";
import { User } from "../model/user";
import { Investment } from "../model/investment";

@Injectable({
    providedIn: 'root'
})
export class Agent {
    url = 'http://localhost:8080/api';

    public userFromAPI: Promise<User>;
    public portfolioFromAPI: Promise<Portfolio>;

    constructor(private http: HttpClient) {}

    //get user
    getUser(username: string | string, password: string | string): Promise<User> {
        let user = this.http.post<User>(this.url + '/login', {
            'username': username,
            'password': password
        })
        .toPromise()
        .catch(error => {
            console.error(error.error);
            return undefined;
        });

        this.userFromAPI = user;

        return user;
    }

    //get portfolio
    getPortfolio(userId: string | number): Promise<Portfolio> {
        let portfolio = this.http.get<Portfolio>(this.url + `/${userId}/getportfolio`)
            .toPromise();

        this.portfolioFromAPI = portfolio;

        return portfolio;
    }

    getTransaction(portfolioId: string | number): Promise<Transaction[]> {
        return this.http.get<Transaction[]>(this.url + `/${portfolioId}/transactions`)
        .toPromise();
    }

    getInvestment(portfolioId: string | number): Promise<Investment[]> {
        return this.http.get<Investment[]>(this.url + `/getInvestments/${portfolioId}`)
        .toPromise();
    }

    deposit(amount: number,userId: string | number): Promise<Portfolio>{
        let portfolio= this.http.put<Portfolio>(this.url + `/${userId}/deposit`,{
        'value':amount
        })
        .toPromise();
        this.portfolioFromAPI=portfolio;
        return portfolio;
    }

    withdraw(amount: number,userId: string | number){
        let portfolio= this.http.put<Portfolio>(this.url + `/${userId}/withdraw`,{
            'value':amount
        })
        .toPromise();
        this.portfolioFromAPI=portfolio;
        return portfolio;
    }
}

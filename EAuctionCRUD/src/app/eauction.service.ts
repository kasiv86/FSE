import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller,State,City,Buyer,Product } from './eauction';
import { Country } from './eauction';

@Injectable({
  providedIn: 'root'
})
export class EAuctionService {
  url = 'http://localhost:59465/Api/EAuction';
  constructor(private http: HttpClient) { }
  getAllSeller(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.url + '/AllSellerDetails');
  }
  getAllBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.url + '/AllBuyerDetails');
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/AllProductDetails');
  }
  getSellerById(sellerId: string): Observable<Seller> {
    return this.http.get<Seller>(this.url + '/GetSellerDetailsById/' + sellerId);
  }
  getProductById(productId): Observable<Product> {
    return this.http.get<Product>(this.url + '/GetProductDetailsById/' + productId);
  }
  createSeller(seller: Seller): Observable<Seller> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Seller>(this.url + '/InsertSellerDetails/',
      seller, httpOptions);
  }
  updateSeller(seller: Seller): Observable<Seller> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Seller>(this.url + '/UpdateSellerDetails/',
      seller, httpOptions);
  }
  deleteSellerById(sellerid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteSellerDetails?id=' + sellerid,
      httpOptions);
  }

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url + '/Country');
  } 

  getState(CountryId: string): Observable<State[]> {
    return this.http.get<State[]>(this.url + '/Country/' + CountryId + '/State');
  }

  getCity(StateId: string): Observable<City[]> {
    return this.http.get<City[]>(this.url + '/State/' + StateId + '/City');
  }

  deleteData(user: Seller[]): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<string>(this.url + '/DeleteRecord/', user, httpOptions);
  }  
}

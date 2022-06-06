import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryDetailsService {
subj = new Subject();

  constructor(private http:HttpClient) { }
  getDetailsOfCountry(){
    //  https://restcountries.com/v3.1/all/check?access_key=AIzaSyC4e5ZxcqXIs3t5QKS0b5xfaTb3CAyA5LA
    // https://restcountries.com/v3.1/all/check?access_key=AIzaSyC4e5ZxcqXIs3t5QKS0b5xfaTb3CAyA5LA
    return this.http.get("https://restcountries.com/v3.1/all");
  }
}

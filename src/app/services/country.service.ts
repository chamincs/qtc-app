import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

getallcontries():Observable<Country[]>
{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'e047e05cabmsha6ed07e6e85e865p1d75f0jsnad72b6c1cbe1',
    'X-RapidAPI-Host':'restcountries-v1.p.rapidapi.com'
  });
     return this.http.get<Country[]>('https://localhost:7222/api/Country');

}
}

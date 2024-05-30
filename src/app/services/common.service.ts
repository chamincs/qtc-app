import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country';
import { WeatherType,WeatherEvent } from '../models/weather-type';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http :HttpClient) { }


  getAllWeatherTypes() :Observable<WeatherType[]>{

    return this.http.get<WeatherType[]>('https://localhost:7222/api/WeatherType');
  }

  getallWeatherEvents():Observable<WeatherEvent[]>{
    return this.http.get<WeatherEvent[]>('https://localhost:7222/api/WeatherEvent');
  }

}

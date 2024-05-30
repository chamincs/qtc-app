import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { Country } from '../models/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { WeatherType } from '../models/weather-type';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-add-weather-event',
  templateUrl: './add-weather-event.component.html',
  styleUrl: './add-weather-event.component.css'
})
export class AddWeatherEventComponent implements OnInit {
  countries :Country[]=[];
  countryControl = new FormControl();
  weatherTypeControl = new FormControl();
  filteredCountries: Observable<Country[]> = of([]);
  filterWeatherType: Observable<WeatherType[]> = of([]);
  weatherTypes : WeatherType[]=[];
  eventName = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  description = new FormControl();
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddWeatherEventComponent>,private countryService: CountryService, private commonService: CommonService,private fb: FormBuilder){

    this.form = this.fb.group({
      country: ['', Validators.required],
      weatherType :['',Validators.required],
      eventName:['',Validators.required],
      eventDescription:['',Validators.required],
      startDate:['',Validators.required],
      endDate: ['',Validators.required],
      description:['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.filteredCountries = this.countryControl.valueChanges
      .pipe(
        startWith<string | Country>(''),
        map(value => typeof value === 'string' ? value : value.countryName),
        map(name => name ? this.filter(name) : this.countries.slice())
      );
      this.filterWeatherType = this.weatherTypeControl.valueChanges
      .pipe(
        startWith<string | WeatherType>(''),
        map(value => typeof value === 'string' ? value : value.weatherTypeName),
        map(name => name ? this.filterWeatherTypes(name) : this.weatherTypes.slice())
      );
      this.commonService.getAllWeatherTypes().subscribe((result)=>(
        this.weatherTypes = result
      ));

      this.countryService.getallcontries().subscribe((result)=>(
        this.countries = result
      ));

  }
  onClose(): void {

    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.form.valid) {
      const selectedCountry = this.form.value.country;
      console.log('Selected Country:', selectedCountry);
      this.dialogRef.close(selectedCountry);
    }
  }
  filter(val: string): Country[] {
    return this.countries.filter(x =>
      x.countryName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterWeatherTypes(val: string): WeatherType[] {
    return this.weatherTypes.filter(x =>
      x.weatherTypeName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  displayFn(code?: string): string | undefined {
    //return country ? country?.countryName : undefined;
    const country = this.countries.find(country => country.countryCode === code);
    return country ? country.countryName : '';
  }
}

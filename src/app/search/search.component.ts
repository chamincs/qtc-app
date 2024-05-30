
import { Component,OnInit,ViewChild } from '@angular/core';
import { ISearch } from '../searchdto';
import { MatStartDate } from '@angular/material/datepicker';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { Country } from '../models/country';
import { WeatherEvent, WeatherType, WeatherEventTable } from '../models/weather-type';
import { FormControl,FormBuilder, FormGroup  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddWeatherEventComponent } from '../add-weather-event/add-weather-event.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements  OnInit {
  search: ISearch= { countryCode:'', weatherTypeCode:'' , eventName :'' , eventDescription :'', location:'', enddate:null, startDate:null};
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;

  searchQuery: string = '';
  searchResults: string[] = [];
  countries: Country[]=[];
  weatherTypes : WeatherType[] =[];
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<Country[]> = of([]);
  weatherEvents: WeatherEvent[]=[];
  dataSource = new MatTableDataSource<WeatherEventTable>();
  tableColumns  :  string[] = ['Country', 'WeatherType', 'Name', 'Description', 'StartDate', 'EndDate'];
  weatherEventTable: WeatherEventTable[]=[];
  filterForm: FormGroup;


  constructor(private countryApiService: CountryService, private commonService : CommonService,private fb: FormBuilder,public dialog: MatDialog) {

    this.filterForm = this.fb.group({
      Country: [''],
      WeatherType: [''],
      Name: [''],
      Description: [''],
      Location: [''],
      StartDate: [''],
      EndDate: [''],
    });
  }
  openDialog(): void {
    this.dialog.open(AddWeatherEventComponent, {
      width: '400px',
      disableClose: true
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    )
    this.countryApiService.getallcontries().subscribe((countryresults)=> {
      this.countries = countryresults;

    })

    this.commonService.getAllWeatherTypes().subscribe((results)=>{
       this.weatherTypes = results;
    })
    this.commonService.getallWeatherEvents().subscribe((results)=>{
      this.weatherEvents = results;
      this.weatherEvents.forEach(element => {
        this.weatherEventTable.push(  {
          'Country' : element.country.countryName,
          'WeatherType' :element.weatherType.weatherTypeName,
          'Name' : element.weatherEventName,
          'Description': element.description,
          'StartDate': element.startDate,
          'EndDate': element.endDate })
      });
      this.dataSource.data = this.weatherEventTable;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.filterForm.valueChanges.subscribe(formValues => {
      this.applyFilter(formValues)
  })
}

  filter(val: string): Country[] {
    return this.countries.filter(x =>
      x.countryName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  applyFilter(formValues: any) {
    this.dataSource.filterPredicate = (data: WeatherEventTable, filter: string) => {
      const countryMatch = data.Country.toLowerCase().includes(formValues.Country.toLowerCase());

      const weathertypeMatch =  data.WeatherType.toLowerCase().includes(formValues.WeatherType.toLowerCase());

      const  nameMatch = data.Name.toLowerCase().includes(formValues.Name.toLowerCase());

      //const populationMatch = data.population.toString().includes(formValues.population);
      return countryMatch && weathertypeMatch && nameMatch ;//&& populationMatch;
    };

    this.dataSource.filter = JSON.stringify(formValues);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

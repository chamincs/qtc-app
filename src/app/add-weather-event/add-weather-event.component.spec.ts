import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeatherEventComponent } from './add-weather-event.component';

describe('AddWeatherEventComponent', () => {
  let component: AddWeatherEventComponent;
  let fixture: ComponentFixture<AddWeatherEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWeatherEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWeatherEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

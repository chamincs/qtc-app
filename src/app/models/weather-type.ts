import { Country } from "./country"

export interface WeatherType {
  weatherTypeId:number
  weatherTypeCode: string
  weatherTypeName: string
}

export interface WeatherEvent{

  weatherEventId :number
  weatherEventName : string
  description :string
  country : Country
  weatherType : WeatherType
  location : string
  startDate: Date
  endDate:Date
}

export interface WeatherEventTable{
  Country :string
  WeatherType:string
  Name:string
  Description:string
  StartDate:Date
  EndDate:Date
}



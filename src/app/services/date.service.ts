import { Injectable } from '@angular/core';
import { IMyDateModel } from 'angular-mydatepicker';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertFromStringToIMyDateModel(input: string, isRange: boolean = false): IMyDateModel {
    //implementation for dateFormat: 'yyyy.mm.dd'
    const year: number = parseInt(input.slice(0,4));
    const month: number = parseInt(input.slice(5,7));
    const day: number = parseInt(input.slice(8));

    return { 
      isRange: isRange,
      singleDate: {
        date: {
          year: year,
          month: month,
          day: day
        },
        formatted: input
      }
    };
  }
}

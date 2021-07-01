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

  getCurrentDateFormatted(): string {
    const today: Date = new Date();
    const yyyy: string = String(today.getFullYear());
    const mm: string = String(today.getMonth() + 1).padStart(2, '0');
    const dd: string = String(today.getDate()).padStart(2, '0');

    return `${yyyy}.${mm}.${dd}`;
  }
}

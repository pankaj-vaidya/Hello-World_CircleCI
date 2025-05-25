import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private eventsUrl = "http://localhost:3000/api/events";
  private _specialEventUrl = "http://localhost:3000/api/special";
  
    getEvents(){
      return this.http.get<any>(this.eventsUrl)
    }
   getSpecialEvents(){
    return this.http.get<any>(this._specialEventUrl)
   }
  }

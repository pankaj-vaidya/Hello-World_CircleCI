import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-special-events',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './special-events.component.html',
  styleUrl: './special-events.component.css'
})
export class SpecialEventsComponent implements OnInit {
  events: any = []
  constructor(private __eventService: EventService){}
  
  ngOnInit(): void {
   this.__eventService.getSpecialEvents().subscribe(
    res => this.events = res,
    err => console.log(err)
   )
  }
  }
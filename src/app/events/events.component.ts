import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
events: any = []
constructor(private __eventService: EventService){}

ngOnInit(): void {
 this.__eventService.getEvents().subscribe(
  res => this.events = res,
  err => console.log(err)
 )
}
}

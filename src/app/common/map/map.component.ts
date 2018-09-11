import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

import { CamelizePipe } from 'ngx-pipes';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  isPositionError: boolean = false;
  lat: number;// = 51.678418;
  lng: number;// = 7.809007;
  protected map: any;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef ) { }

  ngOnInit() {}

  mapReadyHandler(){
    this.mapService.getGeoLocation(this.location).subscribe(
    (coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
      console.log(this.lat,this.lng);
    }, () => {
      this.isPositionError = true; 
    });
  }
}

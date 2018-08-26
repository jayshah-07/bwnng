import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
  //  this.rentalService.getRentals().subscribe(
  //     (rentals) => { this.rentals = rentals;}
  //   );
  const rentalObservable = this.rentalService.getRentals();
  rentalObservable.subscribe(
    (rentals:Rental[])=>{
      this.rentals = rentals;
    },
    (err) => {

    },
    () => {

    }
  )}

}

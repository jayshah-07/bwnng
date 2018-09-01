import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from './shared/rental.model';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient ){

  }

  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + rentalId);
  }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  // private rentals: Rental[] = [
  //   {
  //     id: "1",
  //     title:"Central Appartment",
  //     city: "New York",
  //     street: "Times Square",
  //     category: "appartment",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 3,
  //     description: 'Very nice appartment',
  //     dailyRate: 34,
  //     shared: false,
  //     createdAt: "24/12/17"
  //   },
  //   {
  //     id: "2",
  //     title:"Pearl village",
  //     city: "Hyderabad",
  //     street: "Botanical garden",
  //     category: "appartment",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 3,
  //     description: 'Very nice appartment',
  //     dailyRate: 34,
  //     shared: false,
  //     createdAt: "24/08/18"
  //   },
  //   {
  //     id: "3",
  //     title:"Maphar complex",
  //     city: "Hyderabad",
  //     street: "pearl village road",
  //     category: "appartment",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 3,
  //     description: 'Very nice appartment',
  //     dailyRate: 24,
  //     shared: false,
  //     createdAt: "02/07/18"
  //   },
  //   {
  //     id: "4",
  //     title:"Green View Appartment",
  //     city: "New York",
  //     street: "Times Square",
  //     category: "appartment",
  //     image: "http://via.placeholder.com/350x250",
  //     bedrooms: 3,
  //     description: 'Very nice appartment',
  //     dailyRate: 14,
  //     shared: false,
  //     createdAt: "24/12/17"
  //   }
  // ];
  // constructor() { }

  // public getRentalById(rentalId:string){
  //   return new Observable<Rental> ((observer) => {
  //     setTimeout(()=>{
  //       // const foundRental = this.rentals.filter((rental) => {
  //       //   rental.id == rentalId;
  //       // });

  //       const foundRental = this.rentals.find((rental) => {
  //         return rental.id == rentalId;
  //       });
  //       observer.next(foundRental);
  //     }, 500);
      
  //   })
  // }

  // public getRentals(): Observable<Rental[]> {
  //   return new Observable<Rental[]>((observer) => {
  //     setTimeout(()=> {
  //       observer.next(this.rentals);
  //     },1000);
  //   });
  // }
  // public getRentals(): Observable<Rental[]> {
  //   const rentalObservable:Observable<Rental[]> = new Observable((observer) => {
  //     setTimeout(() => {
  //       observer.next(this.rentals);
  //     }, 1000);

  //     setTimeout(() => {
  //       observer.error("just testing error")
  //     }, 3000);

  //     setTimeout(() => {
  //       observer.complete();
  //     },5000);
  //   });
  //   return rentalObservable;
  // }
}

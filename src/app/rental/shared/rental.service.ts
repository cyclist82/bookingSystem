import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Rental} from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentals: Rental[] = [{
    id: '1',
    title: 'Central Appartement',
    city: 'New York',
    street: 'Times Square',
    category: 'apartement',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartement',
    dailyRate: 34,
    shared: false,
    createdAt: '24.12.2017',
  },
    {
      id: '2',
      title: 'Central Apartement 2',
      city: 'San Francisco',
      street: 'Main Street',
      category: 'apartement',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Very nice apartement',
      dailyRate: 12,
      shared: false,
      createdAt: '24.12.2015',
    },
    {
      id: '3',
      title: 'Central Appartement 3',
      city: 'Deutelhausen',
      street: 'Grafinger Straße',
      category: 'condo',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Very nice apartement',
      dailyRate: 334,
      shared: false,
      createdAt: '24.12.2016',
    },
  ];

  constructor() {
  }

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id === rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

  public getAllRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);
    });
  }
}




import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Rental} from './rental.model';
import {HttpClient} from '@angular/common/http';

const RENTAL_BASE_URI = '/api/v1/rentals';

@Injectable({
    providedIn: 'root'
})
export class RentalService {


    constructor(private http: HttpClient) {
    }

    public getRentalsByUser(): Observable<Rental[]> {
        return this.http.get<Rental[]>(RENTAL_BASE_URI + '/manage');
    }

    public getRentalById(rentalId: string): Observable<Rental> {
        return this.http.get<Rental>(RENTAL_BASE_URI + '/' + rentalId);
    }

    public getAllRentals(): Observable<Rental[]> {
        return this.http.get<Rental[]>(RENTAL_BASE_URI);
    }

    public getRentalsByCity(city: string): Observable<Rental[]> {
        return this.http.get<Rental[]>(`${RENTAL_BASE_URI}?city=${city}`);
    }

    public createRental(rental: Rental): Observable<any> {
        return this.http.post(RENTAL_BASE_URI, rental);
    }

    public deleteRentalById(rentalId: string): Observable<any> {
        return this.http.delete(RENTAL_BASE_URI + '/' + rentalId);
    }
}




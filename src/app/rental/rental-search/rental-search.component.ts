import {Component, OnInit} from '@angular/core';
import {Rental} from '../shared/rental.model';
import {RentalService} from '../shared/rental.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'bsw-rental-search',
    templateUrl: './rental-search.component.html',
    styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

    city: string;
    rentals: Rental[] = [];

    errors: any[] = [];

    constructor(private rentalService: RentalService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.city = params['city'];
                this.getRentals();
            });
    }

    private getRentals() {
        this.errors = [];
        this.rentals = [];
        this.rentalService.getRentalsByCity(this.city)
            .subscribe(
                (rentals: Rental[]) => {
                    this.rentals = rentals;
                },
                (errorResponse: HttpErrorResponse) => {
                    this.errors = errorResponse.error.errors;
                }
            );
    }
}

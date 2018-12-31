import {Component, OnInit} from '@angular/core';
import {Rental} from '../../rental/shared/rental.model';
import {RentalService} from '../../rental/shared/rental.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastaConfig, ToastaService} from 'ngx-toasta';

@Component({
    selector: 'app-manage-rental',
    templateUrl: './manage-rental.component.html',
    styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

    rentals: Rental[];
    rentalDeleteIndex: number;

    constructor(private rentalService: RentalService,
                private toastaService: ToastaService,
                private toastaConfig: ToastaConfig) {
        this.toastaConfig.theme = 'bootstrap';
        this.toastaConfig.position = 'top-right';
    }

    ngOnInit() {
        this.rentalService.getRentalsByUser()
            .subscribe((rentals: Rental[]) => {
                this.rentals = rentals;
            });
    }

    deleteRental(rentalId: string) {
        this.rentalService.deleteRentalById(rentalId)
            .subscribe(() => {
                this.rentals.splice(this.rentalDeleteIndex, 1);
                this.rentalDeleteIndex = undefined;
            }, (errorResponse: HttpErrorResponse) => {
                this.toastaService.error({
                    title: 'Fehler!',
                    msg: errorResponse.error.errors[0].detail,
                    showClose: false,
                    timeout: 5000,
                });
                this.rentalDeleteIndex = undefined;
            });
    }
}

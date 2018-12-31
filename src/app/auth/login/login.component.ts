import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errors: any[] = [];
    notifyMessage: string = '';

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initForm();
        this.route.params.subscribe(
            (params) => {
                if (params['registered'] === 'success') {
                    this.notifyMessage = 'Registrierung war erfolgreich, sie können sich jetzt einloggen!';
                }
            }
        );
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    isInvalidForm(fieldName): boolean {
        return this.loginForm.controls[fieldName].invalid
            && (this.loginForm.controls[fieldName].dirty
                || this.loginForm.controls[fieldName].touched);
    }

    isRequred(fieldName): boolean {
        return this.loginForm.controls[fieldName].errors.required;
    }

    onLogin() {
        this.authService.login(this.loginForm.value)
            .subscribe(
                (token) => {
                    this.router.navigate(['/rentals']);
                },
                (error) => {
                    this.errors = error.error.errors;
                }
            );
    }
}

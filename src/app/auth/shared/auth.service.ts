import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

const USERS_BASE_URI = '/api/v1/users';

class DecodedToken {
    exp = 0;
    username = '';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private decodedToken;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('bsw_meta')) || new DecodedToken();
    }

    private saveToken(token: string): string {
        this.decodedToken = jwt.decode(token);
        localStorage.setItem('bsw_auth', token);
        localStorage.setItem('bsw_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    private getExpiration() {
        return moment.unix(this.decodedToken.exp);
    }

    public register(userData: any): Observable<any> {
        return this.http.post(USERS_BASE_URI + '/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post(USERS_BASE_URI + '/auth', userData).pipe(map(
            (token: string) => this.saveToken(token)
        ));
    }

    public logout() {
        localStorage.removeItem('bsw_auth');
        localStorage.removeItem('bsw_meta');
        this.decodedToken = new DecodedToken();
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public getAuthToken(): string {
        return localStorage.getItem('bsw_auth');
    }

    public getUsername(): string {
        return this.decodedToken.username;
    }

}

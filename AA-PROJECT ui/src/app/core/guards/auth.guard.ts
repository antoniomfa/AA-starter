import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

/**
 * This guard is for checking if a user is authenticated or not. If not, then
 * redirect to the login page
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {

    constructor(
        private router: Router,
        private _auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userLoggedIn = this._auth.isLoggedIn();

        if (userLoggedIn) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], {});
        return false;
    }
}

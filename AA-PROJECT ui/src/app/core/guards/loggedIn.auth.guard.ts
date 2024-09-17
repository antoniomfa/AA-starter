import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { AuthService } from "@core/services/auth/auth.service"

@Injectable()
export class LoggedInAuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(): boolean {
        console.log(this._authService.isLoggedIn());

        if (this._authService.isLoggedIn()) {
            this._router.navigate(['/'])
            return false
        } else {
            return true
        }
    }
}
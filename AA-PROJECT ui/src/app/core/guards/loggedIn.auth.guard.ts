import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "@core/services/auth/auth.service"

@Injectable()
export class LoggedInAuthGuard  {
    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) {
            this._router.navigate(['/'])
            return false
        } else {
            return true
        }
    }
}
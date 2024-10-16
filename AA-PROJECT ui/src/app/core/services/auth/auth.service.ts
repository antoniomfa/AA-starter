import { Injectable } from '@angular/core';
import { Logger } from '@core/services/logger/logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiEndpoints, ApiMethod } from '@core/interfaces/api.interface';
import { LocalStorageTypes } from '@core/services/local-storage/local-storage.interface';
import { ChangeUserPassword, RawUser, User } from '@core/models/user.model';
import { AppErrorHandler } from '@core/services/error-handler/error-handler.service';
import { HttpService } from '@core/services/http/http.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { AuthenticationRequest } from '@core/models/AuthenticationRequest.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServ } from './LocalStorageServ.service';
import { RegisterRequest } from '@core/models/RegisterRequest.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authData: BehaviorSubject<RawUser> = new BehaviorSubject<RawUser>(null);

	constructor(
		private _http: HttpService,
		private _error: AppErrorHandler,
		private http: HttpClient
	) { }

	private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

	// Getter para obter o observable do estado de login
	isLoggedIn$ = this.loggedIn.asObservable();

	/**
	 * Determine if current user is authenticated or not
	 * @returns {boolean}
	 */
	isAuthenticated() {
		return !!LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
	}

	isLoggedIn(): boolean {
		return localStorage.getItem('user') !== null;
	}

	/**
	 * Get the current user
	 * @returns {User}
	 */
	getUser() {
		return User.deserialize(LocalStorageServ.get('user'));
	}

	/**
	 * Get the current user's initials
	 * @returns {string}
	 */
	getUserInitials() {
		if (this.getUser()) {
			return this.getUser().initials;
		}
		return null;
	}

	authenticate(request: AuthenticationRequest) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		return this.http.post<AuthenticationRequest>(`https://localhost:44372/api/Account/authenticate`, request, httpOptions)
			.pipe(map(user => {
				// store user details and jwt token in local storage to keep user logged in between page refreshes				
				// this.userSubject.next(user);
				Logger.info('User Logged in', user);
				localStorage.setItem('user', JSON.stringify(user));
				this.loggedIn.next(true);

				return user;
			}));
	}

	/**
	 * Perform the login and store the returned user in sessionStorage
	 * @param loginData {RawUser}
	 * @returns {Observable<User>}
	 */
	login(loginData: RawUser) {
		return this._http.doRequest(ApiEndpoints.LOGIN, ApiMethod.POST, loginData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User Logged in', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Perform a logout and remove the current user from sessionStorage
	 * @returns {Observable<User>}
	 */
	logout() {
		return this._http.doRequest(ApiEndpoints.LOGOUT, ApiMethod.GET)
			.pipe(tap((response) => {
				Logger.info('User logged out', this.getUser());
				LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
				this.authData.next(null);
				return response;
			}));
	}

	logout3(userEmail: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		const headers = new HttpHeaders().append('userEmail', userEmail);

		localStorage.removeItem('user');
		this.loggedIn.next(false);
		// return this.http.get("https://localhost:44372/api/Account/logout", { headers: headers });

		return this.http.post('https://localhost:44372/api/account/logout', { headers: headers }).subscribe(() => {
		});
	}

	/**
	 * Perform a registration and store the returned user in sessionStorage
	 * @param {RawUser} registrationData
	 * @returns {Observable<User>}
	 */
	register(registrationData) {
		return this._http.doRequest(ApiEndpoints.REGISTER, ApiMethod.POST, registrationData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User registered', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}

	register2(request: RegisterRequest): Observable<any> {
		return this.http.post('https://localhost:44372/api/account/register', request);
	}

	/**
	 * Change a user's password
	 * @param {RawUser} chgPwData
	 * @returns {Observable<User>}
	 */
	changePassword(chgPwData: ChangeUserPassword) {
		return this._http.doRequest(ApiEndpoints.CHANGE_PW, ApiMethod.PUT, chgPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User changed password', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * Provide user a means to reset their password
	 * @param forgotPwData
	 * @return {Observable<User>}
	 */
	forgotPassword(forgotPwData) {
		return this._http.doRequest(ApiEndpoints.FORGOT, ApiMethod.PUT, forgotPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User forgot password', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}

	/**
	 * update a user's object in session storage
	 * @param user
	 * @returns {User}
	 */
	updateLocalUser(user: User) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'user', user);
		this.authData.next(user);
		return user;
	}
}

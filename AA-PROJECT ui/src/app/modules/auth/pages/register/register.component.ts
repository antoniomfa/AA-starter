import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iUserState } from '@core/root-store/models/app-state.model';
import { RegisterUserAction } from '@core/root-store/user/user.action';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from '@core/services/error-handler/error-handler.service';
import { PROJECT_NAME } from 'src/environments/environment';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../auth-shared-styles.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
	registrationData: UntypedFormGroup;
	email: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);
	password: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
	verify_password: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
	last_name: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
	first_name: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
	errorMsg: string;
	projectName: string = PROJECT_NAME;
	subscriptions: Subscription = new Subscription();
	submitted = false;

	constructor(
		private _formBuilder: UntypedFormBuilder,
		private _error: AppErrorHandler,
		private _router: Router,
		private _auth: AuthService,
		private store: Store<{ user: iUserState }>
	) {
	}

	get f() { return this.registrationData.controls; }

	ngOnInit(): void {
		this.registrationData = this._formBuilder.group({
			UserName: ['', Validators.required],            // Required field
			FirstName: ['', Validators.required],           // Required field
			LastName: ['', Validators.required],            // Required field
			Email: ['', [Validators.required, Validators.email]],  // Required field, valid email
			Password: ['', [Validators.required, Validators.minLength(6)]],  // Required field, min length 6
			ConfirmPassword: ['', Validators.required]      // Required field, must match Password
		}, { validator: this.passwordMatchValidator });

		// Subscribe to the error service to catch errors
		// this.subscriptions.add(this._error.errorEvent.subscribe((err: Error) => {
		// 	this.errorMsg = err.message;
		// }));
		// this.store.select(store => store.user)
		// 	.subscribe((state) => {
		// 		console.log('got a user, state=', state);
		// 		if (state && state.data) {
		// 			this._router.navigateByUrl('/auth/user');
		// 		}
		// 	});
		// this.buildFormGroup();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Build the formGroup and set default values
	 */
	private buildFormGroup() {
		this.registrationData = this._formBuilder.group({
			email: this.email,
			password: this.password,
			first_name: this.first_name,
			last_name: this.last_name,
			verify_password: this.verify_password
		});
	}

	passwordMatchValidator(group: UntypedFormGroup) {
		const password = group.controls['Password'].value;
		const confirmPassword = group.controls['ConfirmPassword'].value;
		return password === confirmPassword ? null : { notMatching: true };
	}

	/**
	 * Gets the validation message to show for each field
	 * @param {string} field
	 */
	getFieldErrorMessage(field: string) {
		if (field === 'email') {
			if (this.email.hasError('required')) {
				return 'You must provide an email address';
			} else if (this.email.hasError('email')) {
				return 'Please enter a valid email address (yourname@knowhere.com)';
			}
		} else {
			if (this[field].hasError('required')) {
				return `You must provide a ${field}`;
			}
		}
		return '';
	}

	register() {
		this.submitted = true;
		
		if (this.registrationData.invalid) {
			return;
		}

		// Envia os dados de registro
		this._auth.register2(this.registrationData.value).subscribe({
			next: () => {
				this._router.navigate(['/auth/login']);
			},
			error: (error) => {
				alert('Registration failed: ' + JSON.stringify(error.errors));
			}
		});
	}
}

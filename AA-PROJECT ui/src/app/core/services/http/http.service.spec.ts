import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppErrorHandler} from '@core/services/error-handler/error-handler.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {SnackBarRef} from '@shared/components/snack-bar/snack-bar.ref';
import {MockErrorService} from 'src/app/testing/mock-services';

import {HttpService} from './http.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HttpService', () => {
	let service: HttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        { provide: AppErrorHandler, useClass: MockErrorService },
        NotificationService,
        SnackBarRef,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
		service = TestBed.inject(HttpService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

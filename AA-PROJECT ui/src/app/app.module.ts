// import { BrowserModule } from '@angular/platform-browser';
// import { Injector, NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { ServiceLocator } from '@core/services/service-locator';
import { LayoutModule } from '@layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from '@shared/shared.module';
import { LoggedInAuthGuard } from '@core/guards/loggedIn.auth.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * The AppModule
 */
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		// BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		LayoutModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  NgbModule
	],
	providers: [LoggedInAuthGuard, AuthGuard],
	bootstrap: [AppComponent]
})

export class AppModule {
	/**
	 * Update the ServiceLocator to provide the injector to static methods, properties and pojo items
	 * @param _injector
	 */
	constructor(private _injector: Injector) {
		const injectorListener = ServiceLocator.observableInjector.subscribe((injector) => {
			ServiceLocator.injector = injector;
			if (ServiceLocator.injector) {
				injectorListener.unsubscribe();
			}
		});
		ServiceLocator.observableInjector.next(_injector);
	}
}

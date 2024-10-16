// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * The HomeModule
 */
@NgModule({
	declarations: [
		HomeComponent,
		HomeHeaderComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			}
		])
	]
})
export class HomeModule { }

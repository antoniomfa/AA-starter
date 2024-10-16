// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AboutComponent } from './pages/about/about.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: AboutComponent }
];

@NgModule({
	declarations: [AboutComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class AboutModule {
}

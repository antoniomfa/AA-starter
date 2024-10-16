// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FeaturesComponent } from './pages/features/features.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: FeaturesComponent }
];

@NgModule({
	declarations: [FeaturesComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	]
})
export class FeaturesModule { }

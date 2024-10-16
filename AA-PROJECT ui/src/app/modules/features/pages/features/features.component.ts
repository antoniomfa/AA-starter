import { Component, OnInit } from '@angular/core';

interface Feature {
	name: string;
	docsUrl: string;
	version: string;
	docsIcon: string;
	description: string;
}

@Component({
	selector: 'app-features',
	templateUrl: './features.component.html',
	styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}
}

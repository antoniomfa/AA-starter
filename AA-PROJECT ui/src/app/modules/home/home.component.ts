import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '@core/services/http/http.service';
import { LayoutService } from '@layout/services/layout/layout.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor() { }

	ngOnInit(): void {

	}

	ngOnDestroy() {

	}
}

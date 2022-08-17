import { Component, Input, ViewChild } from '@angular/core';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { ApiService } from './api.service';



const socialData = [
  { 'site': 'Facebook', 'link': 'https://www.facebook.com/thecodehubs603/' },
  { 'site': 'Twitter', 'link': 'https://twitter.com/TheCodeHubs' },
  { 'site': 'Linkedin', 'link': 'https://www.linkedin.com/company/the-code-hubs' },
  { 'site': 'Instagram', 'link': 'https://www.instagram.com/thecodehubs/' }
];

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  states: string[] = ["alma", "korte", "citrom"];

  @Input()
  model!: any;

  constructor(private apiService: ApiService)
  {
  }

  // @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  // focus$ = new Subject<string>();
  // click$ = new Subject<string>();

  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  //   const piped = merge(debouncedText$, this.focus$, clicksWithClosedPopup$);

  //   return piped.pipe(map(term => (term === '' ? states
  //         : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)))
  //    }
  
  onSave() {
    
    this.apiService.onSave(this.model);
  }
}
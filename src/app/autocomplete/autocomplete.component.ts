import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {  merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]

})
export class AutocompleteComponent<T, V> implements ControlValueAccessor {
  
  private touched = false;
  
  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Input()
  name!: string;
  
  @Input()
  ngModel!: any;

   @Output()
   ngModelChange = new EventEmitter();

  @Input()
  data!: string[];

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const piped = merge(debouncedText$, this.focus$, clicksWithClosedPopup$);

    return piped.pipe(map(term => (term === '' ? this.data
          : this.data.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)))
     }

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: string){
    this.ngModel = val
    this.onChange(val)
    this.onTouch(val)
}

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
   this.onChange = fn;
  }
  registerOnTouched(onTouched: Function): void {
    this.onTouch = onTouched;
  }

  touch(){
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onTouched = () => {}

  ngOnInit(): void {
    this.instance.selectItem.subscribe(e => {
      const item = e.item as T;
      this.touch();
      this.onChange(item);
      //this.ngModelChange.emit(this.valueFormatter(item));
    });
  }

}


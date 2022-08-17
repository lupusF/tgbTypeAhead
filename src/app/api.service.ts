import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  onSave(model: any) {}

  // constructor(protected http: HttpClient) { }

  // onSave(model: any) {
  //     const req = new HttpRequest(
  //       'POST',
  //       'https://localhost:7231/WeatherForecast',
  //       model
  //     );
  
  //     this.http.request(req).subscribe();
  //   }
}

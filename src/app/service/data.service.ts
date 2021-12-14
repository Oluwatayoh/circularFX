import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = `${environment.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) { }

  getData() {
    return this.http.get<any>(`${this.baseUrl}commodity`);
  }
  saveComodity(data : any) {
    return this.http.post<any>(`${this.baseUrl}commodity`, data);
  }

  eidtComodity(data : any, id:number) {
    return this.http.put<any>(`${this.baseUrl}commodity/${id}`, data);
  }

  deleteComodity(id : any) {
    return this.http.delete<any>(`${this.baseUrl}commodity/${id}`);
  }

}


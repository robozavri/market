import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { Category } from '../models/category';

const API_URL = environment.apiUrl;

@Injectable()
export class CityApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params: any): Observable<QueryResponse<Category>> {
    return this.http.get<any>(`${API_URL}/api/cities`, {
      params,
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/cities`, data, {
      responseType: 'text',
    });
  }

  update(data: any): Observable<any> {
    return this.http.put(`${API_URL}/api/cities/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data: any): Observable<any> {
    return this.http.patch(`${API_URL}/api/cities/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/cities/${id}`, {
      responseType: 'text',
    });
  }

}

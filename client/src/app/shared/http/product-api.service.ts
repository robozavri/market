import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';

const API_URL = environment.apiUrl;

@Injectable()
export class ProductApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params: any): Observable<QueryResponse<any>> {
    return this.http.get<any>(`${API_URL}/api/products`, {
      params,
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/products`, data, {
      responseType: 'text',
    });
  }

  update(data: any): Observable<any> {
    return this.http.put(`${API_URL}/api/products/${data._id}`, data, {
      responseType: 'text',
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/products/${id}`, {
      responseType: 'text',
    });
  }

}

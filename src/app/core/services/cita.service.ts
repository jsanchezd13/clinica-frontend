import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly baseUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/${id}`);
  }

  create(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.baseUrl, cita);
  }

  update(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseUrl}/${id}`, cita);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  confirmar(id: number): Observable<Cita> {
    return this.http.patch<Cita>(`${this.baseUrl}/${id}/confirmar`, {});
  }

  completar(id: number): Observable<Cita> {
    return this.http.patch<Cita>(`${this.baseUrl}/${id}/completar`, {});
  }

  cancelar(id: number): Observable<Cita> {
    return this.http.patch<Cita>(`${this.baseUrl}/${id}/cancelar`, {});
  }
}
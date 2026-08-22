import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private baseUrl = `${environment.apiUrl}/medicos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseUrl);
  }

  getById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.baseUrl}/${id}`);
  }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.baseUrl, medico);
  }

  update(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.baseUrl}/${id}`, medico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchByEspecialidad(especialidad: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseUrl}/especialidad/${especialidad}`);
  }

  getActivos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.baseUrl}/activos`);
  }
}
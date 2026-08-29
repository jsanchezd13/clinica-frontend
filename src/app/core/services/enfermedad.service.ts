import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enfermedad } from '../models/enfermedad.model';

@Injectable({ providedIn: 'root' })
export class EnfermedadService {
  private readonly baseUrl = `${environment.apiUrl}/enfermedades`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(this.baseUrl);
  }

  getById(id: number): Observable<Enfermedad> {
    return this.http.get<Enfermedad>(`${this.baseUrl}/${id}`);
  }

  getActivas(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(`${this.baseUrl}/activos`);
  }

  buscarPorCategoria(categoria: string): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(`${this.baseUrl}/categoria/${categoria}`);
  }

  buscarPorNombre(nombre: string): Observable<Enfermedad[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Enfermedad[]>(`${this.baseUrl}/buscar`, { params });
  }

  create(enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.post<Enfermedad>(this.baseUrl, enfermedad);
  }

  update(id: number, enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.put<Enfermedad>(`${this.baseUrl}/${id}`, enfermedad);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
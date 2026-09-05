import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente, PageResponse, PacienteFiltro } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly baseUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  buscar(filtro: PacienteFiltro): Observable<PageResponse<Paciente>> {
    let params = new HttpParams()
      .set('page', filtro.page ?? 0)
      .set('size', filtro.size ?? 50);

    if (filtro.nombre) params = params.set('nombre', filtro.nombre);
    if (filtro.apellido) params = params.set('apellido', filtro.apellido);
    if (filtro.dpi) params = params.set('dpi', filtro.dpi);
    if (filtro.activo !== undefined && filtro.activo !== null) {
      params = params.set('activo', filtro.activo);
    }

    return this.http.get<PageResponse<Paciente>>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, paciente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
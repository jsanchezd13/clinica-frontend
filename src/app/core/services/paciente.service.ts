// services/paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly baseUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
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
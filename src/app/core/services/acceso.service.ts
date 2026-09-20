import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ModuloAcceso } from '../models/acceso.model';

@Injectable({ providedIn: 'root' })
export class AccesoService {
  private readonly baseUrl = `${environment.seguridadApiUrl}/accesos`;

  constructor(private http: HttpClient) {}

  obtenerAccesos(): Observable<ModuloAcceso[]> {
    return this.http.get<ModuloAcceso[]>(this.baseUrl);
  }
}
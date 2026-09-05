export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  dpi: string;
  telefono: string;
  correo: string;
  fechaNacimiento: string;
  edad?: number;
  activo?: boolean;
}

export interface PageMetadata {
  totalRecords: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageResponse<T> {
  data: T[];
  metadata: PageMetadata;
}

export interface PacienteFiltro {
  nombre?: string;
  apellido?: string;
  dpi?: string;
  activo?: boolean;
  page?: number;
  size?: number;
}
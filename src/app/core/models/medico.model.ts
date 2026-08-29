export interface Medico {
  id?: number;
  nombre: string;
  apellido: string;
  nombreCompleto?: string;
  especialidad: string;
  matricula: string;
  telefono?: string;
  email?: string;
  horarioInicio?: string;
  horarioFin?: string;
  aniosExperiencia?: number;
  aniosExperienciaTexto?: string;
  activo?: boolean;
  fechaRegistro?: string;
  fechaActualizacion?: string;
}
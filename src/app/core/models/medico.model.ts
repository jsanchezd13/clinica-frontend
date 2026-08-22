export interface Medico {
  id?: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  matricula: string;
  telefono: string;
  email: string;
  horarioInicio: string;
  horarioFin: string;
  aniosExperiencia: number;
  activo?: boolean;
}
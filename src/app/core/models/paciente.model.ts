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
export interface Cita {
  id?: number;
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  duracionMinutos: number;
  motivo: string;
  estado: string;
  notas?: string;
  pacienteNombre?: string;
  medicoNombre?: string;
}
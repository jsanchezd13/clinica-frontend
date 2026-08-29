export interface Cita {
  id?: number;
  pacienteId: number;
  pacienteNombreCompleto?: string;  // solo en la respuesta
  medicoId: number;
  medicoNombreCompleto?: string;    // solo en la respuesta
  medicoEspecialidad?: string;      // solo en la respuesta
  fechaHora: string;                // LocalDateTime → "yyyy-MM-ddTHH:mm:ss"
  fechaHoraFormateada?: string;     // solo en la respuesta
  duracionMinutos?: number;
  motivo?: string;
  estado?: string;                  // PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA
  estadoTexto?: string;             // solo en la respuesta
  notas?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
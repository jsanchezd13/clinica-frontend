export interface Enfermedad {
  id?: number;
  nombre: string;
  descripcion?: string;
  sintomas?: string;
  tratamiento?: string;
  categoria?: string;
  codigoCie?: string;
  nivelGravedad?: number;         // 1-5
  nivelGravedadTexto?: string;    // solo en respuesta, ej. "Leve"
  esCronica?: boolean;
  esContagiosa?: boolean;
  tiempoRecuperacionDias?: number;
  fechaRegistro?: string;
  fechaActualizacion?: string;
  activo?: boolean;
}
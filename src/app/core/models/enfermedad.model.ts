export interface Enfermedad {
  id?: number;
  nombre: string;
  descripcion: string;
  sintomas: string;
  tratamiento: string;
  categoria: string;
  codigoCie: string;
  nivelGravedad: number;
  esCronica: boolean;
  esContagiosa: boolean;
  tiempoRecuperacionDias: number;
  activo?: boolean;
}
export interface ModuloAcceso {
  id: number;
  nombre: string;
  ruta: string | null;
  icono: string | null;
  idModuloPadre: number | null;
  hijos?: ModuloAcceso[]; // se llena en el frontend
}
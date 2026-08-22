export interface Usuario {
  id: number;
  username: string;
  email: string;
  nombreCompleto: string;
  roles: string[];
  activo: boolean;
}
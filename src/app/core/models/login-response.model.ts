export interface LoginResponse {
  token: string;
  tipo: string;
  usuarioId: number;
  username: string;
  email: string;
  roles: string[];
  permisos: string [];
  expiracion: number;
}
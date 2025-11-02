// Interfaz para los datos que vienen del front
export interface AdminJwtPayload {
  sub: string;
  roles: string[];
}

export interface StudentJwtPayload {
  sub: number;
  roles: string[];
}

export type JwtPayload = AdminJwtPayload | StudentJwtPayload
import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { ROLE } from "../constants/roles.constants";

/**
 * Decorador compuesto para proteger rutas con autenticación y roles.
 * Siempre agrega el rol ADMIN por defecto.
 */
export const Auth = (...roles: ROLE[]) => {
  // Crea un nuevo array de roles, agregando ADMIN
  const allRoles = [...roles, ROLE.ADMIN];
  // Usa el spread operator para pasar los roles individualmente
  return applyDecorators(Roles(...allRoles), UseGuards(AuthGuard, RolesGuard));
};
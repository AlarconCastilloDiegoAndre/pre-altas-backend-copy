import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLE } from '../constants/roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Metodo principal del guard que determina si la petición puede continuar.
   * Verifica si el usuario tiene al menos uno de los roles requeridos.
   */
  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos desde los metadatos del controlador o metodo usando el decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Obtiene el usuario autenticado desde la petición (usualmente adjuntado por el AuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Permite roles como string o array
    const userRoles = Array.isArray(user.role)
      ? user.role
      : user.role
        ? [user.role]
        : user.roles
          ? user.roles
          : [];

    // Verifica si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}

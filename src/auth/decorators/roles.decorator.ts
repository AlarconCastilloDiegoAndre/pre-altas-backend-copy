import { SetMetadata } from '@nestjs/common';

// Clave que se usará para guardar los roles en los metadatos
export const ROLES_KEY = 'roles';

/**
 * Decorador para especificar los roles requeridos en un controlador o metodo.
 * Ejemplo de uso: @Roles('Admin', 'User')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

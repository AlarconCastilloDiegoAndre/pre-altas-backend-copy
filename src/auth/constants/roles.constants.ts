/**
 * Enum de Roles
 * -------------
 * Define los posibles roles de usuario en la aplicación.
 * Se utiliza tanto para firmar el JWT como para proteger rutas.
 */
export enum ROLE {
  STUDENTS = 'Student',
  ADMIN = 'Admin',
}
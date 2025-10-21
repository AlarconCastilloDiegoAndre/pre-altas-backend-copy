import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY, TOKEN_NAME } from '../constants/jwt.constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // Inyecta el servicio JWT para verificar tokens
  constructor(private jwtService: JwtService) {}

  // Metodo principal que determina si la petición puede continuar
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene el objeto request de la petición HTTP
    const request = context.switchToHttp().getRequest();

    // Intenta extraer el token JWT del header Authorization
    let token = this.extractTokenFromHeader(request);

    // Si no hay token en el header, lo busca en las cookies
    if (!token) {
      token = request.cookies?.[TOKEN_NAME];
      // Si no hay token en ningún lado, lanza excepción de no autorizado
      if (!token) throw new UnauthorizedException();
    }

    try {
      // Verifica el token usando el servicio JWT y la clave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_KEY,
      });
      // Si es válido, agrega el payload (usuario) al request
      request['user'] = payload;
    } catch {
      // Si el token es inválido o expiró, lanza excepción de no autorizado
      throw new UnauthorizedException();
    }
    // Si todo esta bien, continuar con la peticion
    return true;
  }

  // Metodo auxiliar para extraer el token del header Authorization
  private extractTokenFromHeader(request: Request): string | undefined {
    // El header debe tener formato "Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  import { Role } from '../enums/role.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredRoles) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied: insufficient permissions');
      }
  
      return true;
    }
  }
import { Role } from 'generated/prisma';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: Role;
  };
}
import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/models/user.model';

export const LoggedPacient = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: User = request.user;

        delete user.password;

        if (user.role === 'Pacient') {
            return user;
        } else {
            throw new UnauthorizedException(
                'User does not have permission to access this route!',
            );
        }

        return user;
    },
);

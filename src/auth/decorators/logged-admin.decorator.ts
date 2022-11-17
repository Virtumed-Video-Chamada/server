import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

export const LoggedAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    delete user.password;

    if (user.roles === 'ADMIN') {
        return user;
    } else {
        throw new UnauthorizedException(
            'User does not have permission to access this route!',
        );
    }
});

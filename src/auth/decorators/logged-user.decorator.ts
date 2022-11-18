import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/models/user.model';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;

    delete user.password;

    return user;
});

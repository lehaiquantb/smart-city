import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../../common/exceptions.filter';
import { TransformInterceptor } from '../../common/transform.interceptor';

@Global()
@Module({
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
    ],
    exports: [],
})
export class CommonModule {}

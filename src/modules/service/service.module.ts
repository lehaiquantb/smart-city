import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ServiceController } from './service.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
    imports: [AuthModule, RoleModule],
    controllers: [ServiceController],
    providers: [ServiceService, DatabaseService],
    exports: [ServiceService],
})
export class ServiceModule {}

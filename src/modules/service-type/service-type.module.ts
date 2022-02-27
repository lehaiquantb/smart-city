import { ServiceTypeService } from './services/service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
    imports: [AuthModule, RoleModule],
    controllers: [ServiceTypeController],
    providers: [ServiceTypeService, DatabaseService],
    exports: [ServiceTypeService],
})
export class ServiceTypeModule {}

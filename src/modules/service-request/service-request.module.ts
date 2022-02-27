import { ServiceRequestService } from './services/service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
    imports: [AuthModule, RoleModule],
    controllers: [ServiceRequestController],
    providers: [ServiceRequestService, DatabaseService],
    exports: [ServiceRequestService],
})
export class ServiceRequestModule {}

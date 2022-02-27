import { User } from 'src/modules/user/entity/user.entity';
import { ServiceType } from './../../../service-type/entity/service-type.entity';
import { ServiceStatus } from './../../service.constant';
import { CommonListResponse } from 'src/common/helpers/api.response';

export class ServiceResponseDto {
    id: number;
    status?: ServiceStatus;
    name: string;
    description: string;
    serviceType: ServiceType;
    manager: User;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export class ServiceList extends CommonListResponse<ServiceResponseDto> {}

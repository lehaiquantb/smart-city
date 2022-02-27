import { ServiceRequestStatus } from './../../service-request.constant';
import { Service } from './../../../service/entity/service.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { CommonListResponse } from 'src/common/helpers/api.response';

export class ServiceRequestResponseDto {
    id: number;
    status?: ServiceRequestStatus;
    price: number;
    description: string;
    address: string;
    service: Service;
    sender: User;
    receiver: User;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export class ServiceRequestList extends CommonListResponse<ServiceRequestResponseDto> {}

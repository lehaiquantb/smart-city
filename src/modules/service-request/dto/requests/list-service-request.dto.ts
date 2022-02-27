import { ServiceRequestStatus } from './../../service-request.constant';
import { ORDER_DIRECTION } from 'src/common/constants';
export class ServiceRequestListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    statuses: ServiceRequestStatus[];
    senderId?: number;
    receiverId?: number;
    serviceId?: number;
}

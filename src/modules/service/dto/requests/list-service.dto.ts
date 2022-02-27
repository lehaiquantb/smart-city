import { ServiceStatus } from './../../service.constant';
import { ORDER_DIRECTION } from 'src/common/constants';
export class ServiceListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    statuses: ServiceStatus[];
    serviceTypeId?: number;
}

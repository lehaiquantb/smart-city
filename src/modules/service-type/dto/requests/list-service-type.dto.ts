import { ORDER_DIRECTION } from 'src/common/constants';
export class ServiceTypeListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
}

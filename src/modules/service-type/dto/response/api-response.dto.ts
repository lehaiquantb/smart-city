import { CommonListResponse } from 'src/common/helpers/api.response';

export class ServiceTypeResponseDto {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export class ServiceTypeList extends CommonListResponse<ServiceTypeResponseDto> {}

import { ServiceStatus } from './../../service.constant';
export class CreateServiceDto {
    readonly name: string;
    readonly description: string;
    readonly status: ServiceStatus;
    readonly serviceTypeId: number;
    readonly managerId?: number;
}
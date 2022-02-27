import { ServiceRequestStatus } from './../../service-request.constant';
export class CreateServiceRequestDto {
    readonly price: number;
    readonly description: string;
    readonly address: string;
    readonly status: ServiceRequestStatus;
    readonly serviceId: number;
    readonly senderId: number;
    readonly receiverId: number;
}

import { ServiceRequestStatus } from './../../service-request.constant';
export class UpdateServiceRequestDto {
    readonly price: number;
    readonly description: string;
    readonly address: string;
    readonly status: ServiceRequestStatus;
    readonly serviceId: number;
    readonly senderId: number;
    readonly receiverId: number;
}

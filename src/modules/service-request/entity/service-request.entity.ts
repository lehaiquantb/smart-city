import { ServiceRequestStatus } from './../service-request.constant';
import { Service } from './../../service/entity/service.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Table } from 'typeorm';

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { BaseEntity } from 'src/common/entites/BaseEntity';
@Entity({ name: 'service_request' })
export class ServiceRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ type: 'int', nullable: true })
    price: number;

    @Column({ length: 1000, nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ServiceRequestStatus,
        nullable: true,
    })
    status: ServiceRequestStatus;

    @Column({ type: 'int', nullable: true })
    serviceId: number;

    @Column({ type: 'int', nullable: true })
    senderId: number;

    @Column({ type: 'int', nullable: true })
    receiverId: number;

    @ManyToOne(() => Service, (service) => service.id)
    @JoinColumn({
        name: 'serviceId',
    })
    service: Service;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'senderId',
    })
    sender: User;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'receiverId',
    })
    receiver: User;
}

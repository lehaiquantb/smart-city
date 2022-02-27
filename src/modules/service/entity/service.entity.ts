import { User } from 'src/modules/user/entity/user.entity';
import { ServiceType } from './../../service-type/entity/service-type.entity';
import { ServiceStatus } from './../service.constant';

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
@Entity({ name: 'service' })
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: true })
    name: string;

    @Column({ length: 1000, nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ServiceStatus,
        nullable: true,
    })
    status: ServiceStatus;

    @Column({ type: 'int', nullable: true })
    serviceTypeId: number;

    @Column({ type: 'int', nullable: true })
    managerId: number;

    @ManyToOne(() => ServiceType, (serviceType) => serviceType.id)
    @JoinColumn({
        name: 'serviceTypeId',
    })
    serviceType: ServiceType;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'managerId',
    })
    manager: User;
}

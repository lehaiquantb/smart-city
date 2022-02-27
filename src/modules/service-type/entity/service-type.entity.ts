
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
@Entity({ name: 'service_type' })
export class ServiceType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: true })
    name: string;

    @Column({ length: 1000, nullable: true })
    description: string;
}

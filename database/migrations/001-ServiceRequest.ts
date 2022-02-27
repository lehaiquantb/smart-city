import { ServiceRequestStatus } from './../../src/modules/service-request/service-request.constant';
import { UserGender, UserStatus } from '../../src/modules/user/user.constant';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from './constant';

export class ServiceRequest1632891593008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.ServiceRequest,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'serviceId',
                        type: 'int',
                    },
                    {
                        name: 'senderId',
                        type: 'int',
                    },
                    {
                        name: 'receiverId',
                        type: 'int',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(ServiceRequestStatus),
                        default: `'${ServiceRequestStatus.PENDING}'`,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'updatedBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'deletedBy',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.ServiceRequest);
    }
}

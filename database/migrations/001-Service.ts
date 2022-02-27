import { ServiceStatus } from '../../src/modules/service/service.constant';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from './constant';

export class Service1632891593008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.Service,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '1000',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(ServiceStatus),
                        default: `'${ServiceStatus.PENDING}'`,
                    },
                    {
                        name: 'serviceTypeId',
                        type: 'int',
                    },
                    {
                        name: 'managerId',
                        type: 'int',
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
        await queryRunner.dropTable(TABLE_NAME.Service);
    }
}

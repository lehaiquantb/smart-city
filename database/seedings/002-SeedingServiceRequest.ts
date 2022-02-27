import { ServiceRequestStatus } from '../../src/modules/service-request/service-request.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../migrations/constant';
dotenv.config();
export class SeedingServiceRequest1720963593399 implements MigrationInterface {
    tableName = TABLE_NAME.ServiceRequest;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }
    public async up(queryRunner: QueryRunner): Promise<void> {
        const defaultValue = {
            managerId: 4,
        };
        const items = [
            {
                ...defaultValue,
                id: 1,
                price: 150000,
                serviceId: 1,
                senderId: 3,
                receiverId: 4,
                status: ServiceRequestStatus.PENDING,
                description: 'Ti vi bị hỏng máy làm mát ,cần sửa chữa',
                address: 'Số 1, Tòa CT5',
            },
            {
                ...defaultValue,
                id: 2,
                price: 21000,
                serviceId: 3,
                senderId: 3,
                receiverId: 4,
                status: ServiceRequestStatus.ACCEPT,
                description: 'Mua 1 chai Coca đến phòng số 12 tòa CT1',
                address: 'Số 12, Tòa CT1',
            },
        ];

        await queryRunner.manager.getRepository(this.tableName).insert(items);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}

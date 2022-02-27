import { ServiceStatus } from './../../src/modules/service/service.constant';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../migrations/constant';
dotenv.config();
export class SeedingService1720963593399 implements MigrationInterface {
    tableName = TABLE_NAME.Service;
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
                serviceTypeId: 1,
                name: 'Điện lạnh Bảo Châu',
                status: ServiceStatus.ACTIVE,
                description:
                    'Dịch vụ sửa chữa tivi, tủ lạnh tại nhà uy tín số 1 đô thị Times City,...',
            },
            {
                ...defaultValue,
                id: 2,
                name: 'Sửa chữa điện nước Tuấn Cường',
                serviceTypeId: 1,
                status: ServiceStatus.ACTIVE,
                description:
                    'Dịch vụ Sửa chữa điện nước bao gồm các đường dây điện, nước trong nhà,...',
            },
            {
                ...defaultValue,
                id: 3,
                name: 'Căng tin A1',
                serviceTypeId: 3,
                status: ServiceStatus.ACTIVE,
                description:
                    'Mua đồ ăn tại nhà bao gồm các món ăn, đồ uống,...',
            },
        ];

        await queryRunner.manager.getRepository(this.tableName).insert(items);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}

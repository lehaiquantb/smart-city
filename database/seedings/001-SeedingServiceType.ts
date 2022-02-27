import { In, MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../migrations/constant';
dotenv.config();
export class SeedingServiceType1720963593399 implements MigrationInterface {
    tableName = TABLE_NAME.ServiceType;
    needToSeed() {
        const { NEED_SEED_DATA } = process.env;
        return (
            NEED_SEED_DATA && NEED_SEED_DATA.split(',').includes(this.tableName)
        );
    }
    public async up(queryRunner: QueryRunner): Promise<void> {
        const defaultValue = {};
        const items = [
            {
                ...defaultValue,
                id: 1,
                name: 'Dịch vụ Sửa chữa Nội thất',
                description:
                    'Dịch vụ Sửa chữa Nội thất bao gồm tivi, tủ lạnh, máy giặt,...',
            },
            {
                ...defaultValue,
                id: 2,
                name: 'Dịch vụ Sửa chữa điện nước',
                description:
                    'Dịch vụ Sửa chữa điện nước bao gồm các đường dây điện, nước trong nhà,...',
            },
            {
                ...defaultValue,
                id: 3,
                name: 'Ship đồ ăn tại nhà',
                description:
                    'Mua đồ ăn tại nhà bao gồm các món ăn, đồ uống,...',
            },
        ];

        await queryRunner.manager.getRepository(this.tableName).insert(items);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}

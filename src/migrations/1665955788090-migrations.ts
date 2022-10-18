import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665955788090 implements MigrationInterface {
    name = 'migrations1665955788090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "product_count"`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "product_count" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "product_count"`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "product_count" character varying NOT NULL`);
    }

}

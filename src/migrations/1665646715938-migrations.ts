import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665646715938 implements MigrationInterface {
    name = 'migrations1665646715938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_info" ALTER COLUMN "user_phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_info" ALTER COLUMN "user_full_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_505f5208bbc3e7647a77101699d"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_505f5208bbc3e7647a77101699d" FOREIGN KEY ("orderIdOrderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_505f5208bbc3e7647a77101699d"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_505f5208bbc3e7647a77101699d" FOREIGN KEY ("orderIdOrderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_info" ALTER COLUMN "user_full_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_info" ALTER COLUMN "user_phone_number" DROP NOT NULL`);
    }

}

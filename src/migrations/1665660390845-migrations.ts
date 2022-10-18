import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665660390845 implements MigrationInterface {
    name = 'migrations1665660390845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_e0bcdeb5aed2a567c78928d7e07"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_505f5208bbc3e7647a77101699d"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "product_price"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "product_amount"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "UQ_e0bcdeb5aed2a567c78928d7e07"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "productIdId"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "UQ_505f5208bbc3e7647a77101699d"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "orderIdOrderId"`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "UQ_27ca18f2453639a1cafb7404ece" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "orderOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "UQ_d0dd9f6e90ff16c2d4b234b2a01" UNIQUE ("orderOrderId")`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_d0dd9f6e90ff16c2d4b234b2a01" FOREIGN KEY ("orderOrderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_d0dd9f6e90ff16c2d4b234b2a01"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "UQ_d0dd9f6e90ff16c2d4b234b2a01"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "orderOrderId"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "UQ_27ca18f2453639a1cafb7404ece"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "orderIdOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "UQ_505f5208bbc3e7647a77101699d" UNIQUE ("orderIdOrderId")`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "productIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "UQ_e0bcdeb5aed2a567c78928d7e07" UNIQUE ("productIdId")`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "product_amount" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "product_price" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_505f5208bbc3e7647a77101699d" FOREIGN KEY ("orderIdOrderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_e0bcdeb5aed2a567c78928d7e07" FOREIGN KEY ("productIdId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
